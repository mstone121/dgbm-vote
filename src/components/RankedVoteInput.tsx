import type { Dispatch, SetStateAction } from "react";

import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	type DragEndEvent,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import CandidateCard from "./CandidateCard";
import CandidateList from "./CandidateList";

import type { Candidate } from "../types";

export default function RankedVoteInput({
	ranking,
	onRankChange,
}: {
	ranking: Candidate[];
	onRankChange: Dispatch<SetStateAction<Candidate[]>>;
}) {
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<SortableContext items={ranking} strategy={verticalListSortingStrategy}>
				<CandidateList>
					{ranking.map((candidate) => (
						<SortableItem key={candidate.id} candidate={candidate} />
					))}
				</CandidateList>
			</SortableContext>
		</DndContext>
	);

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;

		if (!over) return;

		if (active.id !== over.id) {
			onRankChange((items) => {
				const oldIndex = items.findIndex((item) => item.id === active.id);
				const newIndex = items.findIndex((item) => item.id === over.id);

				return arrayMove(items, oldIndex, newIndex);
			});
		}
	}
}

const SortableItem = ({ candidate }: { candidate: Candidate }) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: candidate.id });

	return (
		<div
			ref={setNodeRef}
			style={{
				transform: CSS.Transform.toString(transform),
				transition,
				cursor: "move",
			}}
			{...attributes}
			{...listeners}
		>
			<CandidateCard candidate={candidate} />
		</div>
	);
};
