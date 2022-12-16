/* JS Library usage examples */
"use strict";

const x = [1, 0, 1]
const y = [1, 0, 1]

// Create Random Forest
// Paramater is the number of trees in the forest
const rf = new RandomForest(1)
// Create K-nearest Neighbor
// Paramater is the number of neighbors
const knn = new KNearestNeighbors(3)
// Create Support Vector machine 
const svc = new SVC()
// Create Logistic Regression 
const logit = new LogisticRegression()

rf.train(x, y)
knn.train(x, y)
svc.train(x, y)
logit.train(x, y)

const y_pred = rf.predict(x)

// y_pred is the output from the predict function and y is the true output values
const table = rf.displaySummary(y_pred, y)

const summaryDiv = $('#summaryDemo')
summaryDiv.append(table)



// Confusion matrix
// y_pred is the output from the predict function and y is the true output values
const cm = rf.displayConfusionMatrix(y_pred, y)
const cmDiv = $('#cmDemo')
cmDiv.append(cm)

/**
* Create a table to compare performances of different models
* The user can click the columns to sort the models by spefict criterion
* The inputs are: array of models to compare, the input data and the true output data 
*/
const comparator = new ModelComparator()
const compareTable = comparator.displayPerformanceTable([rf, knn, svc, logit], x, y)

const compareDiv = $('#compareDiv')
compareDiv.append(compareTable)
