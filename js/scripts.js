$(document).ready(function () {
  /* var elements = document.getElementsByClassName("node-chart-teaser");
var ids = get_teaser_ids(elements);
console.log("Element nid: " + elements[0].id);
generate(ids);*/

  const charts = document.querySelectorAll(".node-chart-content-teaser");

  let count = 0;
  while (count < charts.length) {
    console.log("ID: " + charts[count].id);
    as(charts[count].id);
    count++;
  }

  /*
   *
   */
  function generate(ids) {
    let a = 0;
    console.log("IDS length: " + ids.length);
    while (a < ids.length) {
      console.log("Si te entra mija!");
      console.log("Mira mija ID: " + ids[a]);
      as(ids[a]);
      a++;
    }
  }

  function as(id) {
    //let uri = $(location).attr("href");
    let uri = "http://localhost/treedff/web/";
    let nid = id;
    let axisX = [];
    let axisY = [];

    const create_chart = async () => {
      try {
        let chartResponse = await fetch(uri + "node/" + nid + "?_format=json");
        let chartData = await chartResponse.json();
        console.log(chartData);
        console.log(chartData.title[0].value);

        let numberOfPairs = Object.keys(chartData.field_data_paragraph).length;
        let j = 0;

        while (j < numberOfPairs) {
          var pairResponse = await fetch(
            uri +
              "entity/paragraph/" +
              chartData.field_data_paragraph[j].target_id +
              "?_format=json"
          );

          var pairData = await pairResponse.json();
          axisX.push(pairData.field_axis_x[0].value);
          axisY.push(pairData.field_axis_y[0].value);

          console.log("New Axis X Pushed into arr: " + axisX);
          console.log("New Axis Y Pushed into arr: " + axisY);
          j++;
        }

        create_card(chartData, nid, axisX, axisY);
      } catch (error) {}
    };

    create_chart();
  }

  function create_card(data, nid, axisX, axisY) {
    let style = format_style(data.field_graph_styles[0].value);
    let id = nid;
    let type = data.field_type_of_graph[0].value;

    console.log(type);

    if (type == "pie" || type == "doughnut" || type == "polarArea") {
      let colors = get_colors(style);
      create_pie_chart(data, id, axisX, axisY, colors);
    } else {
      let colors = get_colors(style);
      colors = colors[0];
      create_default_chart(data, id, axisX, axisY, colors);
    }
  }

  function create_default_chart(data, id, axisX, axisY, colors) {
    let sufix = data.field_sufix[0].value;
    let label = data.field_data_type[0].value;
    let type = data.field_type_of_graph[0].value;

    new Chart(id, {
      type: type,
      data: {
        labels: axisX, //concepts,
        datasets: [
          {
            label: label,
            data: axisY, //amounts,
            borderWidth: 1,
            backgroundColor: colors,

            fill: true,
            borderColor: "#d0dff5", // Add custom color border (Line)
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        //animations: animation,
        scales: {
          x: {},
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value, index, ticks) {
                return sufix + " " + value;
              },
            },
          },
        },
      },
    });
  }

  function create_pie_chart(data, id, axisX, axisY, colors) {
    //let sufix = data.field_sufix[0].value;
    let label = data.field_data_type[0].value;
    let type = data.field_type_of_graph[0].value;

    new Chart(id, {
      type: type,
      data: {
        labels: axisX, //concepts,
        datasets: [
          {
            label: label,
            data: axisY, //amounts,
            borderWidth: 1,
            backgroundColor: colors,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
        },
      },
    });
  }

  function format_style(str) {
    switch (str) {
      case "New York":
        str = "new-york";
        return str;
      case "New Mexico":
        str = "new-mexico";
        return str;
      default:
        str = str.toLowerCase();
        return str;
    }
  }

  function get_teaser_ids(elements) {
    let x = 0;
    let ids = [];
    while (x < elements.length) {
      const regex = /node-chart-teaser-/i;
      ids.push(elements[x].id.replace(regex, ""));
      console.log("IDS :" + ids);
      x++;
    }
    return ids;
  }

  function get_colors(style) {
    let colrs = [];
    switch (style) {
      case "florida":
        colrs = ["#66acfa", "#ffe5ae", "#d6eaff", "#bcbbb0", "#d0dff5"];
        return colrs;
      case "new-york":
        colrs = ["#496494", "#7e7f8e", "#e8e5e0", "#f6f6f6", "#d0dff5"];
        return colrs;
      case "georgia":
        colrs = ["#C1D42F", "#002D56", "#EED000", "#B50027", "#fdfdef"];
        return colrs;
      case "default":
        colrs = ["#2270c4", "#50c7c6", "#e4970d", "##1edada", "#d0dff5"];
        return colrs;
      case "california":
        colrs = ["#e4970d", "#86cbf3", "#000505", "#525252", "#d0dff5"];
        return colrs;
      case "texas":
        colrs = ["#002868", "#bf0a30"];
        return colrs;
      case "alabama":
        colrs = ["#7c5d5a", "#5bb2b5", "#f7e7af", "#f8f4e6", "#d0dff5"];
        return colrs;
      case "new-mexico":
        colrs = ["#ffd700", "#bf0a30", "#002d56", "#ffffff", "#d0dff5"];
        return colrs;
      case "arizona":
        colrs = ["#e5601a", "#bb580d", "#bfc1c3", "#252525", "#d0dff5"];
        return colrs;
      default:
    }
  }
});
