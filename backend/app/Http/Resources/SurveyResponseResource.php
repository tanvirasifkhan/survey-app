<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Survey;

class SurveyResponseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->response_id,
            'date' => date_format(date_create($this->created_at), 'dS M, Y'),
            'survey' => Survey::where('id', $this->survey_id)->first()->title,
            'description' => Survey::where('id', $this->survey_id)->first()->description,
            'responses' => $this->responses
        ];
    }
}
