import SelectSingleDeveloper from "../AssignTask components/SelectSingleDeveloper";

const SubmitTaskDevBox = ({ developers, setReqPerson }) => {
    const handleNavClick = (e) => {
        for (let div of document.querySelectorAll(".submit_inner_box")) {
            div.classList.remove("onActive");
        }
        e.target.closest(".submit_inner_box").classList.add("onActive");
    };
    return (
        <>
            <div
                className="p-2 submit_inner_box onActive"
                onClick={(e) => {
                    setReqPerson("all");
                    handleNavClick(e);
                }}
            >
                All
            </div>
            {developers.map((each) => (
                <div
                    className="p-2 submit_inner_box"
                    key={each.name}
                    onClick={(e) => {
                        setReqPerson(each.name);
                        handleNavClick(e);
                    }}
                >
                    <SelectSingleDeveloper devName={each.name} />
                </div>
            ))}
        </>
    );
};

export default SubmitTaskDevBox;
