module App exposing (..)

import Html exposing (Html, div, text, h1, ul, li, button)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Counter


type alias Model =
    { counter : Counter.Model
    }


init : ( Model, Cmd Msg )
init =
    ( { counter = Counter.init }, Cmd.none )



-- UPDATE


type Msg
    = CounterAction Counter.Msg


update : Msg -> Model -> ( Model, Cmd Msg )
update message model =
    case message of
        CounterAction counterAction ->
            { model | counter = Counter.update counterAction model.counter } ! []



-- VIEW


view : Model -> Html Msg
view model =
    div [ class "container" ]
        [ h1 [] [ text "Counter" ]
        , Counter.view model.counter |> Html.map CounterAction
        ]
