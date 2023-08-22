<?php

namespace App\Services;

use App\Models\SurveyResponse;
use Auth;
use DB;

class ResponseService {

    // latest list of survey responses
    public function latestSurveyResponses(){
        return DB::table('responses')->select('responses.*', 'responses.id AS response_id', 'surveys.*')
            ->join('surveys', 'surveys.id', '=', 'responses.survey_id')
            ->where('surveys.user_id', Auth::user()->id)
            ->orderBy('responses.id', 'DESC')->take(4)->get();
    }
    
    // paginated list of surveys
    public function list(){
        return DB::table('responses')->select('responses.*', 'responses.id AS response_id', 'surveys.*')
            ->join('surveys', 'surveys.id', '=', 'responses.survey_id')
            ->where('surveys.user_id', Auth::user()->id)
            ->orderBy('responses.id', 'DESC')->paginate(10);
    }

    // create new survey response
    public function create(array $data){
        return SurveyResponse::create($data);
    }

    // check whether a specific survey response exists or not
    public function exists(int $id){
        return SurveyResponse::where('id', $id)->first();
    }

    // fetch single survey response
    public function fetch(int $id){
        return SurveyResponse::findOrFail($id);
    }

    // delete survey response by id
    public function delete(int $id){
        return SurveyResponse::where('id', $id)->delete();
    }
}