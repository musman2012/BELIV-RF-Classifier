This application is a continuation of the VisualRF application. It's purpose is to allow domain experts to explore given data sets to find the relationship of importances of features, using RF classification.

The application uses a combination of Python and web technologies. In order to run the application, one must have Python 3.x installed (which can be done following instructions given by https://www.python.org/downloads/). Then, install the following Python packages:
- Flask
- Pandas
- Sklearn

These can all be installed with the pip installer. To use the installer, run the following commands in a cmd terminal:
- $ py -m pip install flask
- $ py -m pip install pandas
- $ py -m pip install sklearn

The py command has been used in a windows cmd terminal, but using the pip installer may require slightly different commands on your system. Once these have been installed, the repo can be cloned and the application run.

To summarise the necessary installation steps:
- Install python 3.x from https://www.python.org/downloads/
- Install flask, pandas and sklearn using the pip installer
- Clone this repo

To run the application, the file run.bat has been provided (ergo easily running the application can only be done on windows currently). To run the file, open a cmd terminal and navigate to the repo's root directory, then simply use "run" in the command prompt.
The application will be running on localhost:5000.

Environment Details:
This application has been tested in an environment with the following details:
- OS: Windows 10
- Browser: Google Chrome 84.0.4147.89
- Python version 3.8.3