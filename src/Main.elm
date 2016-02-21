import Effects exposing (Never)
import Counter
import StartApp
import Task
import Html exposing (div, text, ul, li, button)
import Html.Events exposing (onClick)

type Action 
  = Empty -- this action does not modify model, just to trigger a re-render
  | CounterAction Counter.Action
  | AppendLog String

-- for elm-hot-loader to trigger a re-render
port swap : Signal Bool

swapsignal : Signal Action
swapsignal =
  Signal.map (\_ -> Empty) swap

app : StartApp.App Model
app =
  StartApp.start
    { init = init
    , update = update
    , view = view
    , inputs = [ swapsignal ]
    }

type alias Model =
  { counter : Counter.Model
  , logs : List String
  }

init : ( Model, Effects.Effects Action )
init =
  ({ counter = Counter.init, logs = [] }, Effects.none)

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

view : Signal.Address Action -> Model -> Html.Html
view address model =
  div []
    [ text "counter:"
    , Counter.view (Signal.forwardTo address CounterAction) model.counter 
    , text "logss:"
    , button [ onClick address (AppendLog (getLog model)) ] 
        [ text "append log" ]
    , ul [] (List.map (\log -> li [] [ text log ]) model.logs)
    ]

main : Signal Html.Html
main =
  app.html

port tasks : Signal (Task.Task Never ())
port tasks =
  app.tasks

getLog : Model -> String
getLog model =
  ("Count = " ++ (toString model.counter))

callJSLog : String -> Effects.Effects Action
callJSLog log =
  Signal.send logMailbox.address log
    |> Effects.task
    |> Effects.map (\_ -> Empty)

logMailbox : Signal.Mailbox String
logMailbox =
  Signal.mailbox ""
port logs : Signal String
port logs = logMailbox.signal
