# Lagoon

A simple search tool for github documents powered by supabase and llama2

## Getting Started

### React App

- Create a supabase account and setup a new project
- Use the [supabase.sql](supabase.sql) file to create the database schema
- Create a `.env` file in the root of the project and add the following variables:

```
VITE_SUPABASE_URL=<supabase url>
VITE_SUPABASE_KEY=<supabase key>
```

- Run `yarn` to install dependencies
- Run `yarn dev` to start the dev server

### Python inference api

- `cd inference-server`
- Create a virtual environment `python3 -m venv venv`
- Activate the virtual environment `source venv/bin/activate`
- Install dependencies `pip install -r requirements.txt`
- Run the server `python inference.py`

> The first startup will take a few minutes to download the model and load it into memory

## Demo

![demo](demo.gif)