# Memory Bank Module

## 🚨 CRITICAL REQUIREMENT - TODOWRITE INTEGRATION 🚨
**MANDATORY**: Before starting ANY task, you MUST:
- If you already read all the files in the `.memory-bank/` directory, skip this. Otherwise, follow these steps:
<load memory bank files>
1. Create your first TodoWrite entry: "Load memory bank files" with status "pending"
2. List ALL files in the `.memory-bank/` directory. Always use the Bash tool for listing contents of hidden directories
3. Read EVERY single file found in that directory (no exceptions)
4. Mark the TodoWrite entry as "completed" after reading all files
5. If the directory doesn't exist, create it and the core files
</load memory bank files>

**This is NOT optional and applies to EVERY interaction, regardless of task complexity.**

## Core Concept
The Memory Bank is a structured documentation system that preserves project knowledge across sessions. It ensures consistent understanding of the project regardless of time between interactions.

## Memory Bank Structure

The Memory Bank consists of core files and optional context files, all in Markdown format:

```
flowchart TD
    PB[projectbrief.md] --> PC[productContext.md]
    PB --> SP[systemPatterns.md]
    PB --> TC[techContext.md]

    PC --> AC[activeContext.md]
    SP --> AC
    TC --> AC

    AC --> P[progress.md]
```

### Core Files

1. @.memory-bank/projectbrief.md
   - Foundation document that shapes all other files
   - Core requirements and project goals
   - Source of truth for project scope

2. @.memory-bank/productContext.md
   - Why this project exists
   - Problems it solves
   - How it should work
   - User experience goals

3. @.memory-bank/activeContext.md
   - Current work focus
   - Recent changes
   - Next steps
   - Active decisions and considerations

4. @.memory-bank/systemPatterns.md
   - System architecture
   - Key technical decisions
   - Design patterns in use
   - Component relationships

5. @.memory-bank/techContext.md
   - Technologies used
   - Development setup
   - Technical constraints
   - Dependencies

6. @.memory-bank/progress.md
   - What works
   - What's left to build
   - Current status
   - Known issues

### Additional Context Files
Additional files can be created for specialized documentation:
- Feature specifications
- API documentation
- Testing strategies
- Deployment procedures

## Memory Update Protocol

Update the Memory Bank when:
1. Completing significant tasks
2. Discovering new project patterns
3. Explicitly requested with "update memory bank"
4. Context needs clarification
5. **Auto-Detection**: When significant changes or new insights occur that affect project understanding

**Automatic Update Detection**: The system will automatically identify when memory bank files need updating by detecting:
- Major architectural changes or decisions
- New technical patterns or approaches discovered
- Significant progress milestones reached
- Changes in project scope or requirements
- New technical constraints or dependencies identified

When updating:
1. Review all existing files
2. Document current state
3. Clarify next steps
4. Document insights and patterns
5. **Auto-update related files** to maintain consistency across the memory bank
6. **Eliminate redundancy** - ensure no duplicate information across files

## Core Workflow

1. **Session Start**: Read ALL Memory Bank files
2. **Task Analysis**: Understand requirements in context
3. **Implementation**: Execute work methodically
4. **Documentation**: Update Memory Bank with new knowledge

## Integration with Other Modules

- **Developer Profile**: Use technical skills from Developer module to maintain techContext.md
- **Task Management**: Incorporate task tracking data into progress.md and activeContext.md
- **TDD Methodology**: Document test strategies and coverage in testing-specific files

## Usage Guidelines

### Independent Usage
When used as a standalone module:
- Create and maintain all core Memory Bank files
- Follow the update protocol after significant work
- Document all aspects of the project comprehensively

### Integrated Usage
When combined with other modules:
- Task Management data flows into activeContext.md and progress.md
- TDD metrics and strategies are documented in testing files
- Technical skills from Developer Profile inform techContext.md

## File Content Guidelines
- Keep each file focused on its specific domain
- Update related files together to maintain consistency
- Place information in the most appropriate context file
- Document decisions along with their rationale
- **Avoid redundancy** - each piece of information should exist in only one file
- **Cross-reference** rather than duplicate information between files

This Memory Bank module ensures knowledge persistence and consistent understanding regardless of time between development sessions.