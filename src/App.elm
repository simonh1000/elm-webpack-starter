module App (Model, Action(..), init, update, view, logMailbox) where

import Effects exposing (Never)
import Counter
import StartApp
import Task
import Html exposing (div, text, ul, li, button)
import Html.Events exposing (onClick)


type alias Model =
  { counter : Counter.Model
  , logs : List String
  }

init : ( Model, Effects.Effects Action )
init =
  ({ counter = Counter.init, logs = [] }, Effects.none)

-- UPDATE

type Action
  = Empty -- this action does not modify model, just to trigger a re-render
  | CounterAction Counter.Action
  | AppendLog String

update : Action -> Model -> ( Model, Effects.Effects Action)
update action model =
  case action of
    Empty -> (model, Effects.none)

    CounterAction counterAction ->
      let
        (counterModel, _) = Counter.update counterAction model.counter
      in
        ( { model |
            counter = counterModel
          }
        , Effects.none
        )

    AppendLog log ->
      ( { model |
          logs = log :: model.logs
        }
      , callJSLog log -- call js using port
      )

-- VIEW

view : Signal.Address Action -> Model -> Html.Html
view address model =
  div []
    [ text "counter:"
    , Counter.view (Signal.forwardTo address CounterAction) model.counter
    , text "logs:"
    , button [ onClick address (AppendLog (getLog model)) ]
        [ text "append log" ]
    , ul [] (List.map (\log -> li [] [ text log ]) model.logs)
    ]

getLog : Model -> String
getLog model =
  ("Count = " ++ (toString model.counter))

-- TASKS / EFFECTS

callJSLog : String -> Effects.Effects Action
callJSLog log =
  Signal.send logMailbox.address log
    |> Effects.task
    |> Effects.map (\_ -> Empty)

logMailbox : Signal.Mailbox String
logMailbox =
  Signal.mailbox ""
