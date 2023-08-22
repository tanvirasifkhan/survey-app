<?php

namespace App\Services;

use App\Models\Survey;
use Auth;

class SurveyService {

    // latest list of surveys
    public function latestSurveys(){
        return Survey::where('user_id', Auth::user()->id)->orderBy('id', 'DESC')->take(4)->get();
    }
    
    // paginated list of surveys
    public function list(){
        return Survey::orderBy('id', 'DESC')->where('user_id', Auth::user()->id)->paginate(10);
    }

    // paginated list of home surveys
    public function homeList(){
        return Survey::orderBy('id', 'DESC')->paginate(10);
    }

    // create new survey
    public function create(array $data){
        return Survey::create($data);
    }

    // check whether a specific survey exists or not
    public function exists(int $id){
        return Survey::where('id',$id)->first();
    }

    // fetch single survey
    public function fetch(int $id){
        return Survey::findOrFail($id);
    }

    // fetch single survey for home page
    public function fetchHomeSurvey(int $id){
        return Survey::findOrFail($id);
    }

    // delete survey by id
    public function delete(int $id){
        return Survey::where('id', $id)->delete();
    }
}