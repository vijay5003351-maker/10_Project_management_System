function alerter(setAlertBox) {
    setAlertBox(true);
    setTimeout(() => {
        setAlertBox(false);
    }, 1500);
}

export default alerter;
