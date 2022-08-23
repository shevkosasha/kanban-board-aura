public with sharing class OpportunityController {

    private static final String OPPORTUNITY = 'Opportunity';
    private static final String STAGE_NAME = 'StageName';

    @AuraEnabled
    public static List<Opportunity> getOpportunities() {
        return [
            SELECT Id, Name, Account.Name, StageName, Amount, CloseDate
            FROM Opportunity
        ];
    }

    @AuraEnabled
    public static String getStagesInfo() { 
        List<String> values = new List<String>();
        Schema.SObjectType objSobjectType = Schema.getGlobalDescribe().get(OPPORTUNITY);
        Schema.DescribeSObjectResult objDescribeSobject = objSobjectType.getDescribe();
        Map<String, Schema.SObjectField> mapFields = objDescribeSobject.fields.getMap();
        List<Schema.PicklistEntry> lstPickListValues = mapFields.get(STAGE_NAME).getDescribe().getPickListValues();
        for (Schema.PicklistEntry objPickList : lstPickListValues) {
            values.add(objPickList.getValue());
        }   
        return new StagesInfo(values.size(), values).serialize();
    }

    @AuraEnabled
    public static String updateStage(String recordId, String newStage) {
        Opportunity opp = [
            SELECT Id,StageName
            FROM Opportunity
            WHERE Id = :recordId
        ];
        opp.StageName = newStage;
        try {
            upsert opp;
            return 'SUCCESS';
        } catch (Exception e) {
            return 'ERROR: ' + e.getMessage();
        }        
    }

    private class StagesInfo {
        private Integer size;
        private List<String> values;

        private StagesInfo( Integer size, List<String> values) {
            this.size = size;
            this.values = values;
        }

        private String serialize(){
            return JSON.serialize(this);
        }    
    }
}
