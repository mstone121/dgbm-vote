import { ReactNode, useReducer } from "react";
import { AppBar, Container, CssBaseline } from "@mui/material";

import CurrentStage from "./CurrentStage";

import { AppDispatchContext, AppStateContext } from "./context";
import appReducer from "./reducer";
import { Stage } from "./types";

function App() {
	return (
		<div>
			<CssBaseline />
			<AppBar
				position="static"
				sx={{ padding: 2, fontSize: "24px", textAlign: "center" }}
			>
				DGBM Vote
			</AppBar>
			<Container>
				<AppContext>
					<CurrentStage />
				</AppContext>
			</Container>
		</div>
	);
}

const AppContext = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(appReducer, {
		currentStage: Stage.ENTER_VOTERS,
		voters: [],
		candidates: [],
	});

	return (
		<AppDispatchContext.Provider value={dispatch}>
			<AppStateContext.Provider value={state}>
				{children}
			</AppStateContext.Provider>
		</AppDispatchContext.Provider>
	);
};

export default App;
