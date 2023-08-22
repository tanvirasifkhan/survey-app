<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use Auth;
use App\Models\Survey;
use App\Services\SurveyService;
use App\Http\Resources\SurveyResource;
use Response;

class SurveyController extends Controller {
    
    private $surveyService;

    public function __construct(SurveyService $surveyService){
        $this->surveyService = $surveyService;
    }

    // latest list of survey
    public function latestList(){
        return SurveyResource::collection($this->surveyService->latestSurveys());
    }

    // get paginated list of survey
    public function index(){
        return SurveyResource::collection($this->surveyService->list());
    }

    // get paginated list of survey
    public function homeSurveyList(){
        return SurveyResource::collection($this->surveyService->homeList());
    }

    // fetch single survey data
    public function show($id){        
        if($this->surveyService->exists($id)){
            return new SurveyResource($this->surveyService->fetch($id));
        }else{
            return Response::json(['message' => 'Survey not found!']);
        }
    }

    // fetch single survey data for home
    public function showForHome($id){        
        if($this->surveyService->exists($id)){
            return new SurveyResource($this->surveyService->fetch($id));
        }else{
            return Response::json(['message' => 'Survey not found!']);
        }
    }

    // create new survey
    public function create(Request $request){
        $validator = Validator::make($request->all(), [
            'title' => 'required|unique:surveys',
            'description' => 'required',
            'questions' => 'required'
        ],[
            'title.required' => 'Survey has to have a title',
            'title.unique' => 'Title has already been taken',
            'description.required' => 'Survey description is empty',
            'questions.required' => 'Survey questions are empty'
        ]);

        if($validator->fails()){
            return Response::json(['errors' => $validator->getMessageBag()->toArray()]);
        }else{            
            $this->surveyService->create([
                'title' => $request->title,
                'user_id' => Auth::user()->id,
                'description' => $request->description,
                'questions' => $request->questions,
            ]);

            return Response::json(['message' => 'Survey created successfully'], 201);
        }
    }

    // delete survey by id
    public function delete(Request $request){
        if($this->surveyService->exists($request->id)){
            $this->surveyService->delete($request->id);
            return Response::json(['message' => 'Survey deleted successfully'], 200);
        }else{
            return Response::json(['message' => 'Survey not found!']);
        }
    }
}
