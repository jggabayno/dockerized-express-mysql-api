# Goal: isolate business rules from third part dependency
controllers - 
entities - a place were able to create validation rules
interactors - a place where business function that doesnt even know to connect with the database, also an email, the main purpose is that the method that can call
persistence - database logic


# Prepared Statement
# if passing data, need to pass an array of right order data base on the pass statement



# For the Triggers, you need to run one by one the trigger in phpmyadmin sql or mysql cmd