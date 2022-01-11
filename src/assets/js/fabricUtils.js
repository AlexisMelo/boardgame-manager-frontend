const fabricUtils = {
    hideControls(object) {
        object.setControlsVisibility({
            tr: false,
            tl: false,
            br: false,
            bl: false,
            ml: false,
            mt: false,
            mr: false,
            mb: false,
        });
    }
}

export default fabricUtils