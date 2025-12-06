# Moliyachi by Fast Forward.

### Commands to setup backend code-base repository.

1. Install uv (install globally since it is a tool like git, brew, etc.):
```bash
# For macOS and Linux.
curl -LsSf https://astral.sh/uv/install.sh | sh
```

```powershell
# For Windows.
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

2. Install Python 3.14 using uv:
```bash
uv python install 3.14 # Install python.
uv run python --version # Print version.
```

3. Clone repository:
```bash
git clone https://github.com/khasanrashidov/Fast-Forward-AI500.git
cd backend # Go to backend directory.
```

4. Download dependencies:
```bash
uv sync # Creates .venv/ and installs all dependencies using uv.lock and pyproject.toml.
```
- `pyproject.toml`: Lists your project's dependencies and settings.
- `uv.lock`: Freezes exact versions for reproducible installs across machines.

5. Activate virtual environment:
```bash
source .venv/bin/activate # For macOS and Linux.
.venv\Scripts\activate # For Windows.
```

6. Run the application:
```bash
uv run src/app.py
```

### Utility commands.

Delete ***pycache*** files:

```powershell
# For Windows.
Get-ChildItem -Recurse -Directory -Filter __pycache__ | Remove-Item -Recurse -Force
```

```bash
# For macOS and Linux.
find . -type d -name "__pycache__" -exec rm -r {} +
```

Import sorting with isort:
```bash
isort .
```

Formatting with black:
```bash
black .
```

Type checking with mypy:
```bash
mypy .
```