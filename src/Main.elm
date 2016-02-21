import Effects exposing (Never)
import Counter
import StartApp
import Task

import App exposing (..)

app : StartApp.App Model
app =
  StartApp.start
    { init = init
    , update = update
    , view = view
    , inputs = [ swapsignal ]
    }

main =
  app.html

port tasks : Signal (Task.Task Never ())
port tasks =
  app.tasks

-- HOT LOADER

-- After hot swapping, elm-hot-load will call 'swap' port to trigger a re-render.
port swap : Signal Bool

swapsignal : Signal Action
swapsignal =
  Signal.map (\_ -> Empty) swap

-- Used by default example
port logs : Signal String
port logs = logMailbox.signal
