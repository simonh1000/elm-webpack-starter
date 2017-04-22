module App exposing (..)

import Html exposing (Html, div, text, h1, ul, li, button)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Counter


type alias Model =
    { counter : Counter.Model
    , logs : List String
    }


init : ( Model, Cmd Msg )
init =
    ( { counter = Counter.init, logs = [] }, Cmd.none )



-- UPDATE


type Msg
    = NoOp
    | CounterAction Counter.Msg
    | AppendLog String


update : Msg -> Model -> ( Model, Cmd Msg )
update message model =
    case message of
        NoOp ->
            model ! []

        CounterAction counterAction ->
            { model | counter = Counter.update counterAction model.counter } ! []

        AppendLog log ->
            ( { model | logs = log :: model.logs }, Cmd.none )



-- VIEW


view : Model -> Html Msg
view model =
    div [ class "container" ]
        [ h1 [] [ text "Counter" ]
        , Counter.view model.counter |> Html.map CounterAction
        ]
