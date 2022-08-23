({
    getStagesInfo : function(cmp) {
        const action = cmp.get("c.getStagesInfo");
        action.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {                
                const stagesInfo = JSON.parse(response.getReturnValue());
                cmp.set("v.stages", stagesInfo.values);
                cmp.set("v.width", `width: calc(100vw/ ${stagesInfo.size + 1});`);
            }
        });
         $A.enqueueAction(action);
    },
    loadOpportunities : function(cmp) {
        cmp.set("v.loaded", false);
        const action = cmp.get("c.getOpportunities");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                cmp.set("v.oppts", response.getReturnValue());
                cmp.set("v.loaded", true); 
                cmp.set("v.listLoaded", true);             
            }
        });
        $A.enqueueAction(action);
    },
    updateStageAndView: function(cmp, event, parent, elem, recordId, stage){
        cmp.set("v.listLoaded", false);
        const action = cmp.get("c.updateStage");
        action.setParams({
            "recordId":recordId,
            "newStage":stage,
        });
        action.setCallback(this, function(response){
            if (response.getState() === "SUCCESS" && response.getReturnValue() === "SUCCESS") { 
                cmp.set("v.listLoaded", true);
                parent.appendChild(elem);
                $A.get('e.force:refreshView').fire();      
                this.showSuccess();
            } else {
                this.showError();
            }
        });
        $A.enqueueAction(action);
    },
    showSuccess : function(cmp, event, helper) {
        const toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: "Success!",
            message: " Opportunity stage has been updated successfully.",
            duration: '500',
            type: 'success',
            mode: 'pester',
        }); 
        toastEvent.fire();
    },
    showError : function(cmp, event, helper) {
        const toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: "Error!",
            message: " Something has gone wrong.",
            duration: '500',
            type: 'error',
            mode: 'pester',
        });
        toastEvent.fire();
    },
})
