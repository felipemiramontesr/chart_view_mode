"use strict";

$(document).ready(function () {
  /* var elements = document.getElementsByClassName("node-chart-teaser");
  var ids = get_teaser_ids(elements);
  console.log("Element nid: " + elements[0].id);
  generate(ids);*/
  var charts = document.querySelectorAll(".node-chart-content-teaser");
  var count = 0;

  while (count < charts.length) {
    console.log("ID: " + charts[count].id);
    as(charts[count].id);
    count++;
  }
  /*
   *
   */


  function generate(ids) {
    var a = 0;
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
    var uri = "http://localhost/treedff/web/";
    var nid = id;
    var axisX = [];
    var axisY = [];

    var create_chart = function create_chart() {
      var chartResponse, chartData, numberOfPairs, j, pairResponse, pairData;
      return regeneratorRuntime.async(function create_chart$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return regeneratorRuntime.awrap(fetch(uri + "node/" + nid + "?_format=json"));

            case 3:
              chartResponse = _context.sent;
              _context.next = 6;
              return regeneratorRuntime.awrap(chartResponse.json());

            case 6:
              chartData = _context.sent;
              console.log(chartData);
              console.log(chartData.title[0].value);
              numberOfPairs = Object.keys(chartData.field_data_paragraph).length;
              j = 0;

            case 11:
              if (!(j < numberOfPairs)) {
                _context.next = 25;
                break;
              }

              _context.next = 14;
              return regeneratorRuntime.awrap(fetch(uri + "entity/paragraph/" + chartData.field_data_paragraph[j].target_id + "?_format=json"));

            case 14:
              pairResponse = _context.sent;
              _context.next = 17;
              return regeneratorRuntime.awrap(pairResponse.json());

            case 17:
              pairData = _context.sent;
              axisX.push(pairData.field_axis_x[0].value);
              axisY.push(pairData.field_axis_y[0].value);
              console.log("New Axis X Pushed into arr: " + axisX);
              console.log("New Axis Y Pushed into arr: " + axisY);
              j++;
              _context.next = 11;
              break;

            case 25:
              create_card(chartData, nid, axisX, axisY);
              _context.next = 30;
              break;

            case 28:
              _context.prev = 28;
              _context.t0 = _context["catch"](0);

            case 30:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 28]]);
    };

    create_chart();
  }

  function create_card(data, nid, axisX, axisY) {
    var style = format_style(data.field_graph_styles[0].value);
    var id = nid;
    var type = data.field_type_of_graph[0].value;
    console.log(type);

    if (type == "pie" || type == "doughnut" || type == "polarArea") {
      var colors = get_colors(style);
      create_pie_chart(data, id, axisX, axisY, colors);
    } else {
      var _colors = get_colors(style);

      _colors = _colors[0];
      create_default_chart(data, id, axisX, axisY, _colors);
    }
  }

  function create_default_chart(data, id, axisX, axisY, colors) {
    var sufix = data.field_sufix[0].value;
    var label = data.field_data_type[0].value;
    var type = data.field_type_of_graph[0].value;
    new Chart(id, {
      type: type,
      data: {
        labels: axisX,
        //concepts,
        datasets: [{
          label: label,
          data: axisY,
          //amounts,
          borderWidth: 1,
          backgroundColor: colors,
          fill: true,
          borderColor: "#d0dff5" // Add custom color border (Line)

        }]
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
              callback: function callback(value, index, ticks) {
                return sufix + " " + value;
              }
            }
          }
        }
      }
    });
  }

  function create_pie_chart(data, id, axisX, axisY, colors) {
    //let sufix = data.field_sufix[0].value;
    var label = data.field_data_type[0].value;
    var type = data.field_type_of_graph[0].value;
    new Chart(id, {
      type: type,
      data: {
        labels: axisX,
        //concepts,
        datasets: [{
          label: label,
          data: axisY,
          //amounts,
          borderWidth: 1,
          backgroundColor: colors
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top"
          }
        }
      }
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
    var x = 0;
    var ids = [];

    while (x < elements.length) {
      var regex = /node-chart-teaser-/i;
      ids.push(elements[x].id.replace(regex, ""));
      console.log("IDS :" + ids);
      x++;
    }

    return ids;
  }

  function get_colors(style) {
    var colrs = [];

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