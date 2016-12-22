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
    ( { counter = Counter.init, logs = [] }
    , Cmd.none
    )



-- UPDATE


type Msg
    = Empty
      -- this action does not modify model, just to trigger a re-render
    | CounterAction Counter.Msg
    | AppendLog String


update : Msg -> Model -> ( Model, Cmd Msg )
update message model =
    case message of
        Empty ->
            model ! []

        CounterAction counterAction ->
            { model | counter = Counter.update counterAction model.counter } ! []

        AppendLog log ->
            ( { model
                | logs = log :: model.logs
              }
              --   , callJSLog log -- call js using port
            , Cmd.none
            )



-- VIEW


view : Model -> Html Msg
view model =
    div [ class "container" ]
        [ h1 [] [ text "Counter" ]
        , Counter.view model.counter |> Html.map CounterAction
        , text "logs: "
        , button [ onClick (AppendLog <| getLog model) ]
            [ text "append log" ]
        , model.logs
            |> List.map (\log -> li [] [ text log ])
            |> ul []
        ]


getLog : Model -> String
getLog model =
    "Count = " ++ toString model.counter



-- TASKS / EFFECTS
-- callJSLog : String -> Effects.Effects Action
-- callJSLog log =
--   Signal.send logMailbox.address log
--     |> Effects.task
--     |> Effects.map (\_ -> Empty)
--
-- logMailbox : Signal.Mailbox String
-- logMailbox =
--   Signal.mailbox ""
