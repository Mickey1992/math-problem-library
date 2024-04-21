import AddExistedProblem from "./AddExistedProblem";
import AddOriginProblem from "./AddOriginProblem";

export default function AddProblem() {
	//return <AddExistedProblem />;
	return <AddOriginProblem />;
}

AddProblem.action = AddOriginProblem.action;
