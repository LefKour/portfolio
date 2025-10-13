import React, { useEffect, useState, useRef, ReactElement } from "react";
import { Move, Maximize2, Minimize2, X } from 'lucide-react';
import { GUI } from 'dat.gui';

// Types
interface Position {
    x: number;
    y: number;
}

interface Size {
    width: number;
    height: number;
}

interface WindowState {
    position: Position;
    size: Size;
}

interface DraggableWindowProps {
    children: ReactElement;
    title?: string;
    initialWidth?: number;
    initialHeight?: number;
    initialX?: number;
    initialY?: number;
    onClose?: () => void;
    windowId?: string;
}

type ResizeDirection =
    | null
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right';

const DraggableWindow = ({
                            children,
                            title = "Window",
                            initialWidth = 600,
                            initialHeight = 400,
                            initialX = 100,
                            initialY = 100,
                            onClose,
                            windowId = "window-1"
                         }: DraggableWindowProps) => {

    // Refs
    const windowRef = useRef<HTMLDivElement>(null);

    // State
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [isResizing, setIsResizing] = useState<boolean>(false);
    const [resizeDirection, setResizeDirection] = useState<ResizeDirection>(null);
    const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
    const [position, setPosition] = useState<Position>({ x: initialX, y: initialY });
    const [size, setSize] = useState<Size>({ width: initialWidth, height: initialHeight });
    const [isMaximized, setIsMaximized] = useState<boolean>(false);
    const [savedState, setSavedState] = useState<WindowState | null>(null);

    // Event Handlers
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if(isMaximized) return;

        setDragStart({x: e.clientX, y: e.clientY});
        setIsDragging(true);
    };

    const handleResizeHandler = (e: React.MouseEvent<HTMLDivElement>, direction: ResizeDirection) => {
        e.stopPropagation();

        if (isMaximized) return;

        setDragStart({x: e.clientX, y: e.clientY});
        setResizeDirection(direction);
        setIsResizing(true);
    }

    const toggleMaximize = () => {
        if (isMaximized) {
            if (!savedState) return;
            setPosition(savedState.position);
            setSize(savedState.size);
            setSavedState(null);

            setIsMaximized(false);
        } else {
            setSavedState({ position, size });
            setPosition({ x: 0, y: 0 });
            // setSize({ width: window.innerWidth, height: window.innerHeight });
            setIsMaximized(true);
        }
    };

    // Event Response
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if(isMaximized) return;

            if(isDragging) {
                const deltaX = e.clientX - dragStart.x;
                const deltaY = e.clientY - dragStart.y;
                setPosition({x: position.x + deltaX, y: position.y + deltaY});
            }

            if(isResizing){
                const deltaX = e.clientX - dragStart.x;
                const deltaY = e.clientY - dragStart.y;

                let newWidth = size.width;
                let newHeight = size.height;
                let newX = position.x;
                let newY = position.y;

                if (resizeDirection?.includes("right")) newWidth += deltaX;
                if (resizeDirection?.includes("bottom")) newHeight += deltaY;
                if (resizeDirection?.includes("top")){
                    newY += deltaY;
                    newHeight -= deltaY;
                }
                if(resizeDirection?.includes("left")){
                    newX += deltaX;
                    newWidth -= deltaX;
                }

                setSize({width: Math.max(250, newWidth), height: Math.max(250, newHeight)});
                setPosition({x: newX, y: newY});
            }
        };

        const handleMouseUp = (e: MouseEvent) => {
            setIsDragging(false);
            setIsResizing(false);
        }

        if(isDragging || isResizing) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, isResizing]);

    // Styles
    const windowStyle = {
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height
    };

    return (
        <div
            ref={windowRef}
            className="fixed border border-neutral-800 rounded-lg shadow-lg overflow-hidden z-10 bg-transparent"
            style={windowStyle}
        >
            <div
                className="bg-neutral-900 border-b border-gray-800 px-4 py-2 flex items-center justify-between cursor-move select-none"
                onMouseDown={handleMouseDown}
                onDoubleClick={toggleMaximize}
            >
                <div className="flex items-center gap-2">
                    <Move size={16} className="text-white"/>
                    <span className="text-sm font-medium text-neutral-200">{title}</span>
                </div>

                <div className="flex items-center gap-1">
                    <button
                        className="p-1 hover:bg-gray-200 rounded"
                        onClick={toggleMaximize}
                    >
                        {isMaximized ? <Minimize2 size={14}/> : <Maximize2 size={14}/>}
                    </button>
                    {onClose && (
                        <button
                            className="p-1 hover:bg-red-100 hover:text-red-600 rounded"
                            onClick={onClose}
                        >
                            <X size={14}/>
                        </button>
                    )}
                </div>
            </div>

            <div className="relative bg-black/30 backdrop-blur-lg" style={{height: size.height - 40}}>
                {children}
            </div>

            {/* Resize Handles */}
            {!isMaximized && (
                <>
                    <div className="resize-handle absolute bottom-0 right-0 w-3 h-3 cursor-se-resize"
                         onMouseDown={(e) => handleResizeHandler(e, 'bottom-right')}/>
                    <div className="resize-handle absolute top-0 right-0 w-3 h-3 cursor-ne-resize"
                         onMouseDown={(e) => handleResizeHandler(e, 'top-right')}/>
                    <div className="resize-handle absolute top-0 left-0 w-3 h-3 cursor-nw-resize"
                         onMouseDown={(e) => handleResizeHandler(e, 'top-left')}/>
                    <div className="resize-handle absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize"
                         onMouseDown={(e) => handleResizeHandler(e, 'bottom-left')}/>
                    <div className="resize-handle absolute top-0 left-3 right-3 h-1 cursor-n-resize"
                         onMouseDown={(e) => handleResizeHandler(e, 'top')}/>
                    <div className="resize-handle absolute bottom-0 left-3 right-3 h-1 cursor-s-resize"
                         onMouseDown={(e) => handleResizeHandler(e, 'bottom')}/>
                    <div className="resize-handle absolute left-0 top-3 bottom-3 w-1 cursor-w-resize"
                         onMouseDown={(e) => handleResizeHandler(e, 'left')}/>
                    <div className="resize-handle absolute right-0 top-3 bottom-3 w-1 cursor-e-resize"
                         onMouseDown={(e) => handleResizeHandler(e, 'right')}/>
                </>
            )}
        </div>
    );
}

export default DraggableWindow;