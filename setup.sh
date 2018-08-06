# Automatically set up services and actions for tutorial on
# Database-backed Slackbot with Watson Assistant (conversation)
#
# Written by Henrik Loeser

# create Db2 Warehouse service and service credentials
# ibmcloud service create dashDB Entry eventDB
# ibmcloud service key-create eventDB slackbotkey

# create IBM Watson Assistant (Conversation) service
# ibmcloud service create conversation free eventConversation

# create package
#ibmcloud wsk package create fbdemo

# create action for setup using Node.js environment
ibmcloud wsk action create fbdemo/db2Setup db2-setup.js  --kind nodejs:8

# bind action to Db2 credentials
ibmcloud wsk service bind dashDB fbdemo/db2Setup  --instance Db2-elloquent

# invoke actions to create table, then insert sample data
ibmcloud wsk action invoke fbdemo/db2Setup -p mode "[\"setup\"]" -r
#ibmcloud wsk action invoke fbdemo/db2Setup -p mode "[\"sampledata\"]" -r

# action to fetch a single event by name
#ibmcloud wsk action create fbdemo/fetchEventByShortname eventFetch.js  --kind nodejs:8
#ibmcloud wsk service bind dashDB fbdemo/fetchEventByShortname --instance Db2-elloquent #eventDB

# action to fetch all phrases by patient
ibmcloud wsk action create fbdemo/fetchAllPhrasesByPatient allPhrasesFetch.js  --kind nodejs:8
ibmcloud wsk service bind dashDB fbdemo/fetchAllPhrasesByPatient --instance Db2-elloquent 

# action to fetch top N phrases by patient
ibmcloud wsk action create fbdemo/fetchTopN topN.js  --kind nodejs:8
ibmcloud wsk service bind dashDB fbdemo/fetchTopN --instance Db2-elloquent 

# action to fetch phrases by startDate
ibmcloud wsk action create fbdemo/fetchLastPhrase lastPhrase.js  --kind nodejs:8
ibmcloud wsk service bind dashDB fbdemo/fetchLastPhrase --instance Db2-elloquent 

# action to fetch last phrase
ibmcloud wsk action create fbdemo/fetchPhrasesByStartDate phrasesByStartDate.js  --kind nodejs:8
ibmcloud wsk service bind dashDB fbdemo/fetchPhrasesByStartDate --instance Db2-elloquent 


# action to fetch a single event by dates
#ibmcloud wsk action create fbdemo/fetchEventByDates eventFetchDate.js  --kind nodejs:8
#ibmcloud wsk service bind dashDB fbdemo/fetchEventByDates  --instance Db2-elloquent #eventDB

# action to insert a new event
#ibmcloud wsk action create fbdemo/eventInsert eventInsert.js  --kind nodejs:8
#ibmcloud wsk service bind dashDB fbdemo/eventInsert  --instance Db2-elloquent #eventDB
