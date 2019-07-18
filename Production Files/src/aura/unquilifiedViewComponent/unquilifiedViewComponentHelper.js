({
    updateForm: function (component, offset, limit, addToExisted) {
        commonHelper.showSpinner(component, "component-action-spinner");
        
        var getTotalRecordsCountAction = component.get('c.getTotalUnqualifiedRecordsCount');

        getTotalRecordsCountAction.setParams({
            days: component.get('v.lastDays')
        });

        var getTotalRecordsPromise = commonHelper.createPromise(component, getTotalRecordsCountAction);

        getTotalRecordsPromise.then(
            $A.getCallback(function (totalCount) {
                component.set('v.totalDatabaseRecordCount', totalCount);

                if (totalCount != 0) {
                    var lastDays = component.get('v.lastDays');
                    var getUnqualifiedRecordsAction = component.get('c.getUnqualifiedRecords');

                    getUnqualifiedRecordsAction.setParams({
                        days: lastDays,
                        offsetRecords: offset,
                        limitRecords: limit
                    });

                    return commonHelper.createPromise(component, getUnqualifiedRecordsAction);
                }
            })
        ).then(
            $A.getCallback(function (unqualifiedRecords) {
                if (addToExisted) {
                    var newUnqualifiedList = component.get('v.unqualifiedRecords').concat(unqualifiedRecords);

                    component.set('v.unqualifiedRecords', newUnqualifiedList);
                } else {
                    component.set('v.unqualifiedRecords', unqualifiedRecords);
                }
                commonHelper.hideSpinner(component, "component-action-spinner");
            })
        ).catch(
            $A.getCallback(function (errorMessage) {
                console.log(errorMessage);
                console.log(JSON.parse(errorMessage));
                commonHelper.showToast(JSON.parse(errorMessage)[0], "sticky", "error")
            })
        );
    },
})