@isTest
public with sharing class UnqualifiedViewComponentControllerTest
{
	private static final Integer REC_COUNT = 100;
	
	@testSetup
	private static void init()
	{
		TestDataFactory_Opportunity.makeOneLocation();
		TestDataFactory_Opportunity.makeLeads(REC_COUNT, true);
		TestDataFactory_Opportunity.makeOpportunity(REC_COUNT, true);
	}
	
	@IsTest
	private static void testGettingCount()
	{
		Test.startTest();
		Integer actualCount = UnqualifiedViewComponentController.getTotalUnqualifiedRecordsCount('120');
		Test.stopTest();
		
		System.assertEquals(200, actualCount);
	}
	
	@IsTest
	private static void testGetRecords()
	{
		// NB: this is useless once you have both leads and opportunities.  I changed assertion to 100.
		Test.startTest();
		List<UnqualifiedViewComponentController.UnqualifiedRecordWrapper> unqualifiedRecordWrappers = UnqualifiedViewComponentController.getUnqualifiedRecords('120', 0, 50);
		Test.stopTest();
		
		System.assertEquals(REC_COUNT, unqualifiedRecordWrappers.size());
	}
}