window.onload = function() {
    // Fetch the list of files from the server using the GitHub API
    fetch('https://api.github.com/repos/LIS-Jobs-Map/lis-jobs-map.github.io/contents/data')
    .then(response => response.json())
    .then(data => {
        const fileList = document.getElementById('fileList');
        
        // Loop through each file and create a download link
        data.forEach(fileObj => {
            const file = fileObj.name;
            const link = document.createElement('a');
            link.href = fileObj.download_url;
            link.innerText = file;
            link.download = file;
            link.classList.add('btn', 'btn-link');

            const div = document.createElement('div');
            div.appendChild(link);
            fileList.appendChild(div);
        });

        // Enable the 'Download Date' button
        const downloadDateButton = document.getElementById('downloadDate');
        downloadDateButton.onclick = function() {
            const datePicker = document.getElementById('datePicker');
            const formattedDate = datePicker.value.split('-').join('');
            const filename = `jobs_${formattedDate}.json`;

            const fileObj = data.find(obj => obj.name === filename);
            if (fileObj) {
                const link = document.createElement('a');
                link.href = fileObj.download_url;
                link.download = filename;
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                alert('No file available for the selected date.');
            }
        };

        // Enable the 'Download All' button
        const downloadAllButton = document.getElementById('downloadAll');
        downloadAllButton.onclick = function() {
            data.forEach(fileObj => {
                const link = document.createElement('a');
                link.href = fileObj.download_url;
                link.download = fileObj.name;
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        };
    });
};
