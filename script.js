const studentTable = document.getElementById("studentTable").getElementsByTagName("tbody")[0];

fetch("http://localhost:8000/api/get_students")
  .then(response => response.json())
  .then(data => {
    data.forEach(studentListEntry => {
      // Create table row (<tr>)
      const tableRow = document.createElement("tr");

      // Create table data (<td>) for each element
      studentListEntry.forEach(element => {
        const tableData = document.createElement("td");
        tableData.innerText = element;
        tableRow.appendChild(tableData);
      });

      // Create table data (<td>) for the buttons
      const actionTableData = document.createElement("td");

      // Create and append the buttons
      const viewButton = document.createElement("button");
      viewButton.innerText = "View Info";
      actionTableData.appendChild(viewButton);

      // Add event listener to the "View Info" button
      viewButton.addEventListener("click", function() {
        const studentId = parseInt(studentListEntry[0]);
        fetch(`http://localhost:8000/api/get_student/${studentId}`)
          .then(response => response.json())
          .then(data => {
            // Create a new table
            const infoTable = document.createElement("table");
      
            // Add data to the table
            for (const key in data) {
              const row = infoTable.insertRow();
              const cell1 = row.insertCell();
              const cell2 = row.insertCell();
              cell1.textContent = keyMapping[key] || key;
              cell2.textContent = data[key];
            }
      
            // Create a new modal
            const modal = document.createElement("div");
            modal.style.display = "block";
            modal.style.width = "50%";
            modal.style.height = "50%";
            modal.style.margin = "auto";
            modal.style.backgroundColor = "white";
            modal.style.padding = "20px";
            modal.style.position = "fixed";
            modal.style.top = "50%";
            modal.style.left = "50%";
            modal.style.transform = "translate(-50%, -50%)";
            modal.style.overflow = "auto";
            modal.style.zIndex = "1000";
            modal.style.border = "2px solid black";
      
            // Create a close button
            const closeButton = document.createElement("button");
            closeButton.innerText = "Close";
            closeButton.style.position = "absolute";
            closeButton.style.right = "20px";
            closeButton.style.top = "20px";

            // Add event listener to the close button
            closeButton.addEventListener("click", function() {
              modal.style.display = "none";
            });

            // Add the close button to the modal
            modal.appendChild(closeButton);

            // Add the table to the modal
            modal.appendChild(infoTable);

            // Add the modal to the body
            document.body.appendChild(modal);

            // Close the modal when clicked outside
            window.onclick = function(event) {
              if (event.target == modal) {
                modal.style.display = "none";
              }
            }
          })
          .catch(error => {
            console.error("Error fetching student:", error);
            // Handle error, e.g., display an error message
          });
      });

      actionTableData.appendChild(viewButton);

      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      actionTableData.appendChild(deleteButton);

      const adjustButton = document.createElement("button");
      adjustButton.innerText = "Adjust";
      actionTableData.appendChild(adjustButton);

      // Append the actionTableData to the tableRow
      tableRow.appendChild(actionTableData);

      studentTable.appendChild(tableRow);
    });
  })
  .catch(error => {
    console.error("Error fetching students:", error);
  });


  const keyMapping = {
    "0": "Name",
    "1": "Gender",
    "2": "Mail",
    "3": "Phone",
    "4": "University"
  };