"use strict"

class Model {

    constructor(type) {
        this.type = type
        this.algorithm = function () { };
    }

    // constructs the algorithm from the train inputs and outputs
    // the algorithm depends on the model which
    // therefore each model will override this method in their own classes
    train(x, y) { }

    // predics output for given input
    // also sets the values for model evaluations
    predict(x) {
        return this.algorithm(x)
    }

    // gives the summary of the model in the form of a table 
    getSummary() {

    }
}

// Our libary will 3 types of models. Classifers, Clustering and Regression
// Only implementing regression and Classifer for alpha release
class Classifer extends Model {

    constructor(type) {
        super(type)
    }

    countTruePositives(y_pred, y_true) {
        let tp_count = 0
        for (let i = 0; i < y_pred.length; i++) {
            if (y_pred[i] == y_true[i] && y_true[i] == 1) {
                tp_count += 1;
            }
        }
        return tp_count
    }

    countTrueNegatives(y_pred, y_true) {
        let tn_count = 0
        for (let i = 0; i < y_pred.length; i++) {
            if (y_pred[i] == y_true[i] && y_true[i] == 0) {
                tn_count += 1;
            }
        }
        return tn_count
    }

    countFalseNegatives(y_pred, y_true) {
        let fn_count = 0
        for (let i = 0; i < y_pred.length; i++) {
            if (y_pred[i] !== y_true[i] && y_pred[i] == 0) {
                fn_count += 1;
            }
        }
        return fn_count
    }

    countFalsePositives(y_pred, y_true) {
        let fp_count = 0
        for (let i = 0; i < y_pred.length; i++) {
            if (y_pred[i] !== y_true[i] && y_pred[i] == 1) {
                fp_count += 1;
            }
        }
        return fp_count
    }

    getAccuracy(y_pred, y_true) {
        return (this.countTruePositives(y_pred, y_true) + this.countTrueNegatives(y_pred, y_true)) / y_true.length
    }

    getRecall(y_pred, y_true) {
        const tp = this.countTruePositives(y_pred, y_true)
        const tn = this.countTrueNegatives(y_pred, y_true)
        const fp = this.countFalsePositives(y_pred, y_true)
        const fn = this.countFalseNegatives(y_pred, y_true)
        if (tp + fn !== 0) {
            return tp / (tp + fn)
        } else {
            return 0
        }

    }

    getPrecision(y_pred, y_true) {
        const tp = this.countTruePositives(y_pred, y_true)
        const tn = this.countTrueNegatives(y_pred, y_true)
        const fp = this.countFalsePositives(y_pred, y_true)
        const fn = this.countFalseNegatives(y_pred, y_true)
        if (tp + fp !== 0) {
            return tp / (tp + fp)
        } else {
            return 0
        }

    }

    getF1(y_pred, y_true) {
        const recall = this.getRecall(y_pred, y_true)
        const precision = this.getPrecision(y_pred, y_true)

        if (precision + recall) {
            return (2 * precision * recall) / (precision + recall)
        } else {
            return 0
        }

    }

    // gives the summary of the model performance for the dataset
    getSummary(y_pred, y_true) {
        return {
            accuracy: this.getAccuracy(y_pred, y_true),
            recall: this.getRecall(y_pred, y_true),
            precision: this.getPrecision(y_pred, y_true),
            f1: this.getF1(y_pred, y_true)
        }

    }

    // creates a table to display the different model metrics
    // TODO: make the table look nicer 
    displaySummary(y_pred, y_true) {

        const { accuracy, recall, precision, f1 } = this.getSummary(y_pred, y_true)

        const table = document.createElement('Table')
        table.style = `
        margin: 25px 0;
        font-size: 0.9em;
        font-family: sans-serif;
        min-width: 400px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
        `

        // header
        const headerRow = document.createElement('tr')
        headerRow.style = `
        background-color: #009879;
        color: #ffffff;
        text-align: left;
        padding: 12px 15px;
        `

        const accuracyTitle = document.createElement('th')
        accuracyTitle.appendChild(document.createTextNode('Accuracy'))

        const precisionTitle = document.createElement('th')
        precisionTitle.appendChild(document.createTextNode('Precision'))

        const recallTilte = document.createElement('th')
        recallTilte.appendChild(document.createTextNode('Recall'))

        const f1Title = document.createElement('th')
        f1Title.appendChild(document.createTextNode('F1 score'))

        headerRow.appendChild(accuracyTitle)
        headerRow.appendChild(precisionTitle)
        headerRow.appendChild(recallTilte)
        headerRow.appendChild(f1Title)

        // data
        const dataRow = document.createElement('tr')

        const accuracyData = document.createElement('td')
        accuracyData.appendChild(document.createTextNode(accuracy.toFixed(2)))

        const precisionData = document.createElement('td')
        precisionData.appendChild(document.createTextNode(precision.toFixed(2)))

        const recallData = document.createElement('td')
        recallData.appendChild(document.createTextNode(recall.toFixed(2)))

        const f1Data = document.createElement('td')
        f1Data.appendChild(document.createTextNode(f1.toFixed(2)))

        dataRow.appendChild(accuracyData)
        dataRow.appendChild(precisionData)
        dataRow.appendChild(recallData)
        dataRow.appendChild(f1Data)

        table.appendChild(headerRow)
        table.appendChild(dataRow)

        return table

    }

    // give the confusion matrix for the given dataset
    getConfusionMatrix(y_pred, y_true) {
        return {
            tp: this.countTruePositives(y_pred, y_true),
            fp: this.countFalsePositives(y_pred, y_true),
            tn: this.countTrueNegatives(y_pred, y_true),
            fn: this.countFalseNegatives(y_pred, y_true),
        }

    }

    // display the confusion matrix for a given dataset
    displayConfusionMatrix(y_pred, y_true) {
        const { tp, fp, tn, fn } = this.getConfusionMatrix(y_pred, y_true)
        const container = document.createElement('div')
        container.style = 'position: relative; padding-bottom: 600px'

        const topRow = document.createElement('div')
        topRow.style = 'width: 400px; height: 200px'

        const topRowHeader = document.createElement('div')
        topRowHeader.style = 'width: 400px; height: 50px; position: absolute; left: 100px; text-align: center'

        const topRowTitle = document.createElement('p')
        topRowTitle.appendChild(document.createTextNode('Actual Values'))
        topRowHeader.appendChild(topRowTitle)

        const topRowLabels = document.createElement('div')
        topRowLabels.style = 'background: #FFD865;'

        const posLabel = document.createElement('p')
        posLabel.style = 'display: inline-block; width: 200px'
        posLabel.appendChild(document.createTextNode('Positive'))
        topRowLabels.appendChild(posLabel)

        const negLabel = document.createElement('p')
        negLabel.style = 'display: inline-block; width: 200px'
        negLabel.appendChild(document.createTextNode('Negative'))
        topRowLabels.appendChild(negLabel)

        topRowHeader.appendChild(topRowLabels)


        const bottomRow = document.createElement('div')
        bottomRow.style = 'width: 450x; height: 200px'

        const bottomRowHeader = document.createElement('div')
        bottomRowHeader.style = 'display: inline-block; width: 50px; height: 400px; position: absolute; top: 100px; writing-mode: vertical-lr; text-align: center; transform: rotate(180deg); left:50px'

        const bottomRowTitle = document.createElement('p')
        bottomRowTitle.appendChild(document.createTextNode('Predicted Values'))
        // bottomRowHeader.appendChild(bottomRowTitle)

        const bottomRowLabels = document.createElement('div')
        bottomRowLabels.style = 'background: #FFD865;'

        const predPosLabel = document.createElement('p')
        predPosLabel.style = 'display: inline-block; height: 200px'
        predPosLabel.appendChild(document.createTextNode('Positive'))
        bottomRowLabels.appendChild(predPosLabel)

        const predNegLabel = document.createElement('p')
        predNegLabel.style = 'display: inline-block; height: 200px'
        predNegLabel.appendChild(document.createTextNode('Negative'))
        bottomRowLabels.appendChild(predNegLabel)

        bottomRowHeader.appendChild(bottomRowLabels)
        bottomRowHeader.appendChild(bottomRowTitle)

        // bottomRow.appendChild(bottomRowHeader)

        const tpBox = document.createElement('div')
        tpBox.style = 'display: inline-block; background:  #32CD32; min-height: 200px; min-width: 200px; text-align: center; line-height: 200px; color: #FFFFFF; font-weight: bold'
        tpBox.appendChild(document.createTextNode(tp))

        const tnBox = document.createElement('div')
        tnBox.style = 'display: inline-block; background:  #32CD32; min-height: 200px; min-width: 200px; text-align: center; line-height: 200px; color: #FFFFFF; font-weight: bold'
        tnBox.appendChild(document.createTextNode(tn))

        const fpBox = document.createElement('div')
        fpBox.style = 'display: inline-block; background: #FF0000; min-height: 200px; min-width: 200px; text-align: center; line-height: 200px; color: #FFFFFF; font-weight: bold'
        fpBox.appendChild(document.createTextNode(fp))

        const fnBox = document.createElement('div')
        fnBox.style = 'display: inline-block; background: #FF0000; min-height: 200px; min-width: 200px; text-align: center; line-height: 200px; color: #FFFFFF; font-weight: bold'
        fnBox.appendChild(document.createTextNode(fn))

        topRow.appendChild(tpBox)
        topRow.appendChild(fpBox)

        bottomRow.appendChild(fnBox)
        bottomRow.appendChild(tnBox)

        // container.appendChild(topRowHeader)
        // container.appendChild(bottomRowHeader)
        const plot = document.createElement('div')
        plot.style = 'position: absolute; top: 100px; left: 100px'
        plot.appendChild(topRow)
        plot.appendChild(bottomRow)

        container.appendChild(topRowHeader)
        container.appendChild(bottomRowHeader)
        container.appendChild(plot)

        return container
    }


}

class RandomForest extends Classifer {
    constructor(n_estimators) {
        super('Random Forest')
        this.n_estimators = n_estimators
    }

    train(x, y) {
        this.algorithm = (x) => {
            // always return 1
            let y_pred = []
            x.forEach(x => {
                const prob = Math.random()
                const pred = prob > 0.3 ? 1 : 0
                y_pred.push(pred)
            })
            return y_pred
        }
    }
}

class KNearestNeighbors extends Classifer {
    constructor(n_neighbors) {
        super('K-Nearest Neighbors')
        this.n_neighbors = n_neighbors
    }

    train(x, y) {
        this.algorithm = (x) => {
            // always return 1
            let y_pred = []
            x.forEach(x => {
                const prob = Math.random()
                const pred = prob > 0.6 ? 1 : 0
                y_pred.push(pred)
            })
            return y_pred
        }
    }
}

class SVC extends Classifer {
    constructor() {
        super('Support Vector Classifier')
    }

    train(x, y) {
        this.algorithm = (x) => {
            // always return 1
            let y_pred = []
            x.forEach(x => {
                const prob = Math.random()
                const pred = prob > 0.4 ? 1 : 0
                y_pred.push(pred)
            })
            return y_pred
        }
    }

}

class LogisticRegression extends Classifer {
    constructor() {
        super('Logistic regression')
    }

    train(x, y) {
        this.algorithm = (x) => {
            // always return 1
            let y_pred = []
            x.forEach(x => {
                const prob = Math.random()
                const pred = prob > 0.75 ? 1 : 0
                y_pred.push(pred)
            })
            return y_pred
        }
    }

}

class ModelComparator {

    constructor() {
        this.sortAsc = false

        this.upbtnIcon = '\u25B2'
        this.downbtnIcon = '\u25BC'

        this.compareFields = ['Type', `Accuracy${this.upbtnIcon}`, `Precision${this.upbtnIcon}`, `Recall${this.upbtnIcon}`, `F1 Score${this.upbtnIcon}`]

        this.evenRowStyle = 'border-bottom: 1px solid #dddddd;  background-color: #f3f3f3;'
        this.oddRowStyle = 'border-bottom: 1px solid #dddddd;'

    }

    // create table to compare models 
    displayPerformanceTable(models, x, y) {

        const table = document.createElement('Table')
        table.setAttribute('id', 'compareTable')

        table.style = `
        margin: 25px 0;
        font-size: 0.9em;
        font-family: sans-serif;
        min-width: 400px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
        `

        const headerStyle = `
        background-color: #009879;
        color: #ffffff;
        text-align: left;
        padding: 12px 15px;
        `
        // header
        const headerRow = document.createElement('tr')
        headerRow.style = headerStyle
        
        const typeTitle = document.createElement('th')
        typeTitle.appendChild(document.createTextNode('Type'))
        headerRow.appendChild(typeTitle)

        for (let i = 1; i < this.compareFields.length; i++) {
            const title = document.createElement('th')
            title.appendChild(document.createTextNode(this.compareFields[i]))
            const myThis = this
            title.onclick = (e) => { myThis.sortTable(e, i) }
            title.style = 'cursor: pointer; padding: 12px 15px;'
            headerRow.appendChild(title)
        }

        table.appendChild(headerRow)

        let rowNum = 1
        models.forEach(model => {
            const y_pred = model.predict(x)
            const { accuracy, recall, precision, f1 } = model.getSummary(y_pred, y)
            // data
            const dataRow = document.createElement('tr')
            if (rowNum % 2 ) {
                dataRow.style.cssText += this.evenRowStyle
            } else {
                dataRow.style.cssText += this.oddRowStyle
            }

            const accuracyData = document.createElement('td')
            accuracyData.setAttribute('id', 'acc')

            accuracyData.appendChild(document.createTextNode(accuracy.toFixed(2)))

            const precisionData = document.createElement('td')
            precisionData.setAttribute('id', 'precision')
            precisionData.appendChild(document.createTextNode(precision.toFixed(2)))

            const recallData = document.createElement('td')
            recallData.setAttribute('id', 'recall')
            recallData.appendChild(document.createTextNode(recall.toFixed(2)))

            const f1Data = document.createElement('td')
            f1Data.setAttribute('id', 'f1')
            f1Data.appendChild(document.createTextNode(f1.toFixed(2)))

            const typeData = document.createElement('td')
            typeData.appendChild(document.createTextNode(model.type))

            dataRow.appendChild(typeData)
            dataRow.appendChild(accuracyData)
            dataRow.appendChild(precisionData)
            dataRow.appendChild(recallData)
            dataRow.appendChild(f1Data)
            table.appendChild(dataRow)
            rowNum += 1
        })
        return table
    }

    sortTable(e, col_num) {
        var table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById("compareTable");
        switching = true;
        /* Make a loop that will continue until
        no switching has been done: */
        let targetName = e.target.innerHTML
        const icon = targetName.charAt(targetName.length - 1)
        const asc = (icon === this.upbtnIcon)
        console.log(asc)
        while (switching) {
            // Start by saying: no switching is done:
            switching = false;
            rows = table.rows;
            /* Loop through all table rows (except the
            first, which contains table headers): */
            for (i = 1; i < (rows.length - 1); i++) {
                // Start by saying there should be no switching:
                shouldSwitch = false;
                /* Get the two elements you want to compare,
                one from current row and one from the next: */
                x = rows[i].getElementsByTagName("td")[col_num];
                y = rows[i + 1].getElementsByTagName("td")[col_num];
                // Check if the two rows should switch place:
                if (asc) {
                    e.target.innerHTML = targetName.replace(this.upbtnIcon, this.downbtnIcon)
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                } else {
                    e.target.innerHTML = targetName.replace(this.downbtnIcon, this.upbtnIcon)
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                /* If a switch has been marked, make the switch
                and mark that a switch has been done: */
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
        this.recolorRows()

    }

    recolorRows() {
        const table = document.getElementById("compareTable");
        const rows = table.rows;

        for (let i = 1; i < rows.length; i++) {
            if (i % 2 ) {
                rows[i].style.cssText = this.evenRowStyle
            } else {
                rows[i].style.cssText = this.oddRowStyle
            }

        }
    }

}



