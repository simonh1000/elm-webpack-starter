import Effects exposing (Never)
import Counter
import StartApp
import Task
import Html exposing (div, text)

type Action 
  = Empty -- this action does not modify model, just to trigger a re-render
  | CounterAction Counter.Action

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
  {
    counter : Counter.Model
  }

init : ( Model, Effects.Effects Action )
init =
  ({ counter = Counter.init }, Effects.none)

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

view : Signal.Address Action -> Model -> Html.Html
view address model =
  div []
    [ text "change me"
    , Counter.view (Signal.forwardTo address CounterAction) model.counter ]

main : Signal Html.Html
main =
  app.html


port tasks : Signal (Task.Task Never ())
port tasks =
  app.tasks


