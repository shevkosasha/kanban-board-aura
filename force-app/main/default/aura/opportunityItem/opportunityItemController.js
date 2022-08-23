({
    doView: function(component, event, helper) {
        event.preventDefault();
        const editRecordEvent = $A.get("e.force:navigateToSObject");
        editRecordEvent.setParams({
            "recordId": event.target.dataset.id
        });
        editRecordEvent.fire();
    },
    dragstart: function (component, event, helper) {
        event.dataTransfer.setData("recordId", event.target.dataset.id);
        event.dataTransfer.setData("currentStage", event.target.dataset.stage);
    },
})