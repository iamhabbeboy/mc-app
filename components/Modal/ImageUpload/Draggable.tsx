import { DragSource, DragPreviewImage } from 'react-dnd'

function DraggableHouse({ connectDragSource, connectDragPreview }: { connectDragSource: any, connectDragPreview: any }) {
    return (
        <>
            <DragPreviewImage src="house_dragged.png" connect={connectDragPreview} />
            <div ref={connectDragSource}>🏠</div>
        </>
    )
}

export default DragSource(
    /* ... */
    (connect: { dragSource: () => any; dragPreview: () => any }, monitor: any) => ({
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview()
    })
)