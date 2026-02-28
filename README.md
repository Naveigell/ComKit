# ComKit

ComKit is a community kitchen sharing platform that allows users to borrow and share kitchen items within their community. This platform helps reduce waste and promote resource sharing among neighbors.

## Database Setup

If you want to create database, please run `python server-fastapi/migration.py`

This command will create the SQLite database with all necessary tables including users, items, and requests. The database file will be created in the server-fastapi directory.
Don't forget to setuup your `.env` too.