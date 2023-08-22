<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Survey Response Feedback</title>
    <style>
        #name {
            color: #6b7280;
            font-size: 1.125rem;
        }

        #description {
            font-size: 1.125rem;
            margin-top: 0.5rem;
            color: #6b7280;
        }

        #survey {
            font-style: italic;
            color: #14b8a6;
        }

        #linkDiv {
            margin-top: 1.0rem;
        }

        #buttonLink {
            margin-top: 1.5rem;
            color: white;
            background: #14b8a6;
            border-radius: 10px;
            padding: 7px 10px 7px 10px;
            text-decoration: none;
        }

        #mainDiv {
            margin: 1.0rem;
            padding: 20px;
            border-radius: 10px;
            border: 1px;
            border-color: #6b7280;
            background: #f9fafb;
        }
    </style>
</head>
<body>
    <div id="mainDiv">
        <h2 id="name">Hey! <strong> {{ $name }} </strong></h2>
        <h2 id="description">You got a new response for the survey <span id="survey" class="text-teal-500 italic">"{{ $survey }}"</span></h2>
        <div id="linkDiv">
            <a href="{{ 'http://localhost:5173/response/' . $response_id . '/info' }}" id="buttonLink" target="_blnk">View Response Detail</a>
        </div>
    </div> 
</body>
</html>