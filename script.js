 function switchTab(tabName) {
            // Hide all tab contents
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => content.classList.remove('active'));

            // Remove active class from all tabs
            const tabs = document.querySelectorAll('.tab');
            tabs.forEach(tab => tab.classList.remove('active'));

            // Show selected tab content
            document.getElementById(tabName + '-tab').classList.add('active');

            // Add active class to clicked tab
            event.target.classList.add('active');

            // Load downloads if downloads tab is selected
            if (tabName === 'downloads') {
                loadDownloads();
            }
        }

        async function downloadContent() {
            const url = document.getElementById('url-input').value.trim();
            const statusDiv = document.getElementById('status');
            const spinner = document.getElementById('spinner');
            const btn = event.target;

            if (!url) {
                showStatus('Please enter a URL', 'error');
                return;
            }

            // Show loading
            spinner.style.display = 'inline-block';
            btn.disabled = true;
            statusDiv.style.display = 'none';

            try {
                const response = await fetch('/download', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ url: url })
                });

                const result = await response.json();

                if (result.status === 'success') {
                    showStatus(result.message, 'success');
                    document.getElementById('url-input').value = '';
                    // Refresh downloads tab if it's active
                    if (document.getElementById('downloads-tab').classList.contains('active')) {
                        loadDownloads();
                    }
                } else {
                    showStatus(result.message, 'error');
                }
            } catch (error) {
                showStatus('Network error occurred', 'error');
            } finally {
                spinner.style.display = 'none';
                btn.disabled = false;
            }
        }

        async function bulkDownload() {
            const urlsText = document.getElementById('bulk-urls').value.trim();
            const statusDiv = document.getElementById('bulk-status');
            const spinner = document.getElementById('bulk-spinner');
            const btn = event.target;

            if (!urlsText) {
                showStatus('Please enter URLs', 'error', 'bulk-status');
                return;
            }

            const urls = urlsText.split('\n').map(url => url.trim()).filter(url => url);

            if (urls.length === 0) {
                showStatus('Please enter valid URLs', 'error', 'bulk-status');
                return;
            }

            // Show loading
            spinner.style.display = 'inline-block';
            btn.disabled = true;
            statusDiv.style.display = 'none';

            try {
                const response = await fetch('/bulk-download', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ urls: urls })
                });

                const result = await response.json();

                if (result.status === 'success') {
                    showStatus(`Successfully processed ${result.results.length} URLs`, 'success', 'bulk-status');
                    document.getElementById('bulk-urls').value = '';
                    // Refresh downloads tab if it's active
                    if (document.getElementById('downloads-tab').classList.contains('active')) {
                        loadDownloads();
                    }
                } else {
                    showStatus(result.message, 'error', 'bulk-status');
                }
            } catch (error) {
                showStatus('Network error occurred', 'error', 'bulk-status');
            } finally {
                spinner.style.display = 'none';
                btn.disabled = false;
            }
        }

        async function loadDownloads() {
            try {
                const response = await fetch('/downloads');
                const result = await response.json();

                const downloadsGrid = document.getElementById('downloads-grid');
                const emptyState = document.getElementById('empty-state');

                if (result.items && result.items.length > 0) {
                    downloadsGrid.innerHTML = '';
                    emptyState.style.display = 'none';

                    result.items.forEach(item => {
                        const itemDiv = document.createElement('div');
                        itemDiv.className = 'download-item';

                        if (item.type === 'folder') {
                            itemDiv.innerHTML = `
                                <div class="download-title">${item.name}</div>
                                <div class="download-meta">${item.file_count} files</div>
                                <div class="download-actions">
                                    <button class="btn btn-small btn-secondary" onclick="downloadFolder('${item.name}')">Download ZIP</button>
                                </div>
                            `;
                        } else {
                            itemDiv.innerHTML = `
                                <div class="download-title">${item.name}</div>
                                <div class="download-meta">${formatFileSize(item.size)}</div>
                                <div class="download-actions">
                                    <button class="btn btn-small btn-secondary" onclick="downloadFile('${item.name}')">Download</button>
                                </div>
                            `;
                        }

                        downloadsGrid.appendChild(itemDiv);
                    });
                } else {
                    downloadsGrid.innerHTML = '';
                    emptyState.style.display = 'block';
                }
            } catch (error) {
                console.error('Error loading downloads:', error);
            }
        }

        function downloadFile(filename) {
            window.open(`/download-file/${filename}`, '_blank');
        }

        function downloadFolder(foldername) {
            window.open(`/download-folder/${foldername}`, '_blank');
        }

        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }

        function showStatus(message, type, statusId = 'status') {
            const statusDiv = document.getElementById(statusId);
            statusDiv.textContent = message;
            statusDiv.className = `status status-${type}`;
            statusDiv.style.display = 'block';

            // Auto-hide success messages after 5 seconds
            if (type === 'success') {
                setTimeout(() => {
                    statusDiv.style.display = 'none';
                }, 5000);
            }
        }

        // Load downloads on page load if downloads tab is active
        document.addEventListener('DOMContentLoaded', function() {
            if (document.getElementById('downloads-tab').classList.contains('active')) {
                loadDownloads();
            }
        });