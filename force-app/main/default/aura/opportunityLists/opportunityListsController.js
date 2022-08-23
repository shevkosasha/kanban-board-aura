({
    doInit : function(component, event, helper) {
        helper.getStagesInfo(component);
        helper.loadOpportunities(component);
    },
    dragEnter: function(component, event, helper) {
        event.preventDefault();  
        event.target.classList.add('drag-over');    
    },
    dragOver: function(component, event, helper) {
        event.preventDefault();      
    },
    dragLeave: function(component, event, helper) {
        event.preventDefault(); 
        event.target.classList.remove('drag-over');     
    },
    drop: function(component, event, helper) {
        event.preventDefault();
        const recordId = event.dataTransfer.getData("recordId");
        const oldStage = event.dataTransfer.getData("currentStage");
        const newStage = event.target.dataset.stage;
        if (oldStage !== newStage) {
            const elem = document.getElementById(`opp_${recordId}`);
            let parent = event.target;
            while(parent.id !== `stage_${newStage}`) {
                parent = parent.parentElement;
            }
            helper.updateStageAndView(component, event, parent, elem, recordId, newStage);
        }        
    },
})
