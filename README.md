# Documentation/Landing page Link: 
https://polar-basin-49137.herokuapp.com/



# Getting started: 
<code>

    <!-- Call the script -->
    <script src="ml_model.js"></script>

    <!-- Create multiple models instance -->
    <script>
    // The input and output must be an array of numbers
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
    </script>

</code>