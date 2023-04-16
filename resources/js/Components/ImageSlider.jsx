import React, { Fragment, useState } from "react";
import Button from "./Button";
import Icons from "./Icons";

function ImageSlider({ images }) {
    const [slideNumber, setSlideNumber] = useState(0);
    const image_urls = images.map((item) => {
        if (typeof item === "object") {
            return URL.createObjectURL(item);
        } else {
            return route("root") + "/" + item;
        }
    });

    const handleSlideChange = (direction) => {
        if (direction === "right") {
            const nextSlideNumber = slideNumber + 1;
            if (nextSlideNumber === images.length) {
                setSlideNumber(0);
            } else {
                setSlideNumber(nextSlideNumber);
            }
        } else {
            const prevSlideNumber = slideNumber - 1;
            if (prevSlideNumber < 0) {
                setSlideNumber(images.length - 1);
            } else {
                setSlideNumber(prevSlideNumber);
            }
        }
    };

    return (
        <div className="relative">
            {images.length > 0 ? (
                <>
                    <img
                        src={image_urls[slideNumber]}
                        alt="#"
                        className="mx-auto rounded-3xl"
                    />

                    {images.length > 1 && (
                        <Fragment>
                            <Button
                                onClick={() => handleSlideChange("left")}
                                className="absolute top-1/2 bg-white left-1"
                                style={{ transform: "translateY(-50%)" }}
                            >
                                <Icons variant={"arrowLeft"} />
                            </Button>
                            <Button
                                onClick={() => handleSlideChange("right")}
                                className="absolute top-1/2 bg-white right-1"
                                style={{ transform: "translateY(-50%)" }}
                            >
                                <Icons variant={"arrowRight"} />
                            </Button>
                        </Fragment>
                    )}
                </>
            ) : null}
        </div>
    );
}

export default ImageSlider;
