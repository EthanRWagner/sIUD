
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import IUDPage from "./IUDPage";
import Connect from './connect';
import PositionData from './positionData';
import RotationData from './rotationData';
import TempData from './bbtData';
import TimerPopup from "./timerPopup";
import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
              <LoginPage />
						}
					/>

          <Route
						path="/login"
						element={
							<LoginPage />
						}
					/>

          <Route
						path="/register"
						element={
							<RegisterPage />
						}
					/>

        <Route
						path="/iud"
						element={
							<IUDPage />
						}
					/>

        <Route
            path="/connect"
            element={
            < Connect />
            }
          />

		<Route
            path="/positionData"
            element={
            < PositionData />
            }
          />
		<Route
            path="/rotationData"
            element={
            < RotationData />
            }
          />
		<Route
			path="/tempData"
			element={
			< TempData />
			}
		/>

		<Route
			path="/timer"
			element={
			< TimerPopup />
			}
		/>
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
