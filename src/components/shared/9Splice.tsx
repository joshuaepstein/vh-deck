import React, { CSSProperties } from 'react'

interface React9SliceProps {
    image: string
    border?: number
    width?: number
    height?: number
    children?: React.ReactNode
    imageSize: {
        x: number
        y: number
    }
    style?: React.CSSProperties
    pixelDensity?: number
    opacity?: number
}

export default function React9Slice({
    image,
    border = 8,
    width = 128,
    height = 128,
    children,
    imageSize,
    style,
    pixelDensity = 1,
    opacity = 1,
}: React9SliceProps) {
    const BASE_STYLE: CSSProperties = {
        width: border,
        height: border,
        display: 'inline-flex',
        backgroundImage: image ? `url(${image})` : undefined,
        imageRendering: 'auto',
        opacity,
    }

    const IMAGE_X_SIZE_MINUS_BORDER = imageSize.x - border * 2
    const IMAGE_Y_SIZE_MINUS_BORDER = imageSize.y - border * 2
    const IMAGE_X_SIZE_AND_BORDER = imageSize.x + border
    const IMAGE_Y_SIZE_AND_BORDER = imageSize.y + border
    const BORDER_AND_WIDTH = border + width
    const MINUS_BORDER = -border
    const SCALE_X = width / IMAGE_X_SIZE_MINUS_BORDER
    const SCALE_Y = height / IMAGE_Y_SIZE_MINUS_BORDER
    const ABSOLUTE = 'absolute'
    const RELATIVE = 'relative'

    return (
        <div
            className="r9s"
            style={{
                lineHeight: 0,
                width: width + border * 2,
                height: height + border * 2,
                position: RELATIVE,
            }}
        >
            <div style={{ position: RELATIVE }}>
                <div
                    className="r9s-nw"
                    style={Object.assign({}, BASE_STYLE, {
                        backgroundSize: imageSize.x / pixelDensity,
                    })}
                />
                <div
                    className="r9s-n"
                    style={Object.assign({}, BASE_STYLE, {
                        width: width,
                        // transformOrigin: "left",
                        // transform: `scaleX(${SCALE_X})`,
                        backgroundPosition: `center ${-border}px`,
                        backgroundSize: `200% ${imageSize.x / pixelDensity}px`,
                        position: ABSOLUTE,
                        left: border,
                        top: 0,
                    })}
                />
                <div
                    className="r9s-ne"
                    style={Object.assign({}, BASE_STYLE, {
                        backgroundPositionX: IMAGE_X_SIZE_AND_BORDER,
                        backgroundSize: imageSize.x / pixelDensity,
                        position: ABSOLUTE,
                        top: 0,
                        left: BORDER_AND_WIDTH,
                    })}
                />
            </div>
            <div style={{ position: RELATIVE, height, width: width + border * 2 }}>
                <div
                    className="r9s-w"
                    style={Object.assign({}, BASE_STYLE, {
                        height: IMAGE_Y_SIZE_MINUS_BORDER,
                        backgroundPositionY: MINUS_BORDER,
                        transformOrigin: 'left top',
                        transform: `scaleY(${SCALE_Y})`,
                        // height: height,
                        // backgroundPosition: `50% 0%`,
                        // backgroundsize: `${imageSize.x}px ${height}px`
                        // transformOrigin: "left top",
                        // transform: `scaleY(${SCALE_Y})`
                    })}
                />
                <div
                    className="r9s-c"
                    style={Object.assign({}, BASE_STYLE, {
                        width: IMAGE_X_SIZE_MINUS_BORDER,
                        height: IMAGE_Y_SIZE_MINUS_BORDER,
                        lineHeight: 1,
                        verticalAlign: 'top',
                        transform: `scaleX(${SCALE_X}) scaleY(${SCALE_Y})`,
                        transformOrigin: 'left top',
                        backgroundPositionX: MINUS_BORDER,
                        backgroundPositionY: MINUS_BORDER,
                        position: ABSOLUTE,
                        left: border,
                        top: 0,
                    })}
                />
                <div
                    className="r9s-e"
                    style={Object.assign({}, BASE_STYLE, {
                        height: IMAGE_Y_SIZE_MINUS_BORDER,
                        backgroundPositionX: IMAGE_X_SIZE_AND_BORDER,
                        backgroundPositionY: MINUS_BORDER,
                        backgroundSize: imageSize.x / pixelDensity,
                        position: ABSOLUTE,
                        top: 0,
                        left: BORDER_AND_WIDTH,
                        transformOrigin: 'left top',
                        transform: `scaleY(${SCALE_Y})`,

                        // height: height,
                        // backgroundPosition: `50% 0%`,
                        // backgroundsize: `${imageSize.x}px ${height}px`,
                        // backgroundPositionY: MINUS_BORDER,
                        // position: ABSOLUTE,
                        // top: 0,
                        // left: BORDER_AND_WIDTH
                        // transformOrigin: "left top",
                        // transform: `scaleY(${SCALE_Y})`
                    })}
                />
                <div
                    className="r9-content"
                    style={Object.assign(
                        {},
                        {
                            position: ABSOLUTE,
                            top: 0,
                            left: border,
                            width,
                            height,
                            zIndex: 10,
                            boxSizing: 'border-box',
                            lineHeight: 1.39,
                        },
                        style
                    )}
                >
                    {children}
                </div>
            </div>
            <div style={{ position: ABSOLUTE, top: height + border }}>
                <div
                    className="r9s-sw"
                    style={Object.assign({}, BASE_STYLE, {
                        backgroundPositionY: IMAGE_Y_SIZE_AND_BORDER,
                        backgroundSize: imageSize.x / pixelDensity,
                    })}
                />
                <div
                    className="r9s-s"
                    style={Object.assign({}, BASE_STYLE, {
                        width: width,
                        // transformOrigin: "left",
                        // transform: `scaleX(${SCALE_X})`,
                        backgroundPosition: `center ${-border}px`,
                        backgroundSize: `200% ${imageSize.x / pixelDensity}px`,
                        position: ABSOLUTE,
                        left: border,
                        top: 0,
                    })}
                />
                <div
                    className="r9s-se"
                    style={Object.assign({}, BASE_STYLE, {
                        backgroundPositionX: IMAGE_X_SIZE_AND_BORDER,
                        backgroundPositionY: IMAGE_Y_SIZE_AND_BORDER,
                        backgroundSize: imageSize.x / pixelDensity,
                        position: ABSOLUTE,
                        top: 0,
                        left: BORDER_AND_WIDTH,
                    })}
                />
            </div>
        </div>
    )
}
