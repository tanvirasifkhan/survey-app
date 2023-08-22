<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use Response;
use App\Services\ResponseService;
use App\Http\Resources\SurveyResponseResource;
use App\Mail\SurveyResponseMail;
use Illuminate\Support\Facades\Mail;
use App\Models\Survey;
use App\Models\User;
use DB;

class SurveyResponseController extends Controller {
    
    private $responseService;

    public function __construct(ResponseService $responseService){
        $this->responseService = $responseService;
    }

    // latest list of survey responses
    public function latestList(){
        return SurveyResponseResource::collection($this->responseService->latestSurveyResponses());
    }

    // get paginated list of survey responses
    public function index(){
        return SurveyResponseResource::collection($this->responseService->list());
    }

    // fetch single survey response data
    public function show($id){        
        if($this->responseService->exists($id)){
            return new SurveyResponseResource($this->responseService->fetch($id));
        }else{
            return Response::json(['message' => 'Survey Response not found!']);
        }
    }

    // create new survey response
    public function create(Request $request){            
        $response = $this->responseService->create([
            'survey_id' => $request->survey_id,
            'responses' => $request->responses
        ]);

        $name = DB::table('users')->select('users.name', 'users.id', 'surveys.user_id')
                ->join('surveys', 'surveys.user_id', '=', 'users.id')
                ->where('surveys.id', $request->survey_id)->first()->name;

        $email = DB::table('users')->select('users.name', 'users.id', 'users.email', 'surveys.user_id')
                ->join('surveys', 'surveys.user_id', '=', 'users.id')
                ->where('surveys.id', $request->survey_id)->first()->email;

        $survey = Survey::where('id', $request->survey_id)->first()->title;

        $response_id = $response->id;

        Mail::to($email)->send(new SurveyResponseMail($name, $email, $survey, $response_id));

        return Response::json(['message' => 'Survey response created successfully'], 201);
    }

    // delete survey response by id
    public function delete(Request $request){
        if($this->responseService->exists($request->id)){
            $this->responseService->delete($request->id);
            return Response::json(['message' => 'Survey response deleted successfully'], 200);
        }else{
            return Response::json(['message' => 'Survey response not found!']);
        }
    }
}
