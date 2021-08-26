<?php

namespace App\Http\Requests;

class NoiGioiThieuFormRequest extends ApiFormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'date'                  => 'required|date_format:Y-m-d H:i:s|before:tomorrow',
            'yesterday_summary'     => 'required|string',
            'today_summary'         => 'required|string',
            'status'                => 'required|int'
        ];
    }
}
