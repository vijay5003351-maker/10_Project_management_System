const AlertBox = ({ alertBox, message }) => {
    return (
        <div className={alertBox ? "alert_box visible" : "alert_box"}>
            <div className="p-2">
                <p>{message}</p>
            </div>
            <div className="alert_under_line"></div>
        </div>
    );
};

export default AlertBox;
