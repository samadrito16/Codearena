/**
 * Breadth-First Search Pattern Mastery Blueprints (5 Curated Production Blueprints)
 * Zero placeholder content. Full executable brute force & optimal solutions.
 */

export function getCuratedBreadthFirstSearch() {
  return [
    {
      id: 'bfs-001',
      slug: 'distributed-hierarchical-tree-layer-sweep',
      title: 'Distributed Hierarchical Tree Layer Sweep',
      pattern: 'breadth_first_search',
      difficulty: 'Easy',
      estimated_minutes: 20,
      statement: {
        description: 'Given the list representation of a binary tree tree_nodes in level order (where None represents missing children), return the level order traversal of its nodes values (i.e., from left to right, level by level).\\n\\nEach level should be returned as a separate sublist in the output list of lists.',
        input_format: 'tree_nodes: list[any]',
        output_format: 'list[list[int]] containing node values grouped by level',
        examples: [
          {
            input: 'tree_nodes = [3, 9, 20, None, None, 15, 7]',
            output: '[[3], [9, 20], [15, 7]]',
            explanation: 'Level 0 contains [3], Level 1 contains [9, 20], and Level 2 contains [15, 7].'
          },
          {
            input: 'tree_nodes = [1]',
            output: '[[1]]',
            explanation: 'Single root node yields single level [[1]].'
          }
        ],
        constraints: [
          '0 <= tree_nodes.length <= 2,000',
          '-1000 <= node value <= 1000'
        ]
      },
      pattern_clues: [
        'Problem explicitly asks for level-by-level (layer-by-layer) grouping of nodes',
        'FIFO queue data structure naturally maintains nodes in order of their discovery distance from root',
        'Snapshotting queue size at each depth step separates current level from next level'
      ],
      trigger_words: ['level order traversal', 'layer by layer', 'breadth first search', 'FIFO queue', 'level size snapshot'],
      brute_force: {
        approach: 'Determine maximum depth of tree. For each depth level d from 0 to max_depth, traverse the tree from the root using recursive depth-limited search to collect all nodes at depth d.',
        why_it_is_too_slow: 'Re-traversing from the root for each level takes O(N * D) where D is depth (up to O(N^2) on skewed trees), visiting the upper nodes repeatedly.',
        time_complexity: 'O(N^2)',
        space_complexity: 'O(N)',
        language: 'python',
        code: `def layer_order_tree_sweep(tree_nodes):
    if not tree_nodes or tree_nodes[0] is None:
        return []
    
    class TreeNode:
        def __init__(self, val):
            self.val = val
            self.left = None
            self.right = None

    nodes = [TreeNode(v) if v is not None else None for v in tree_nodes]
    for i in range(len(tree_nodes)):
        if nodes[i] is not None:
            left_idx = 2 * i + 1
            right_idx = 2 * i + 2
            if left_idx < len(tree_nodes):
                nodes[i].left = nodes[left_idx]
            if right_idx < len(tree_nodes):
                nodes[i].right = nodes[right_idx]
    root = nodes[0]

    def get_height(node):
        if not node:
            return 0
        return 1 + max(get_height(node.left), get_height(node.right))

    def collect_level(node, target_d, current_d, result):
        if not node:
            return
        if current_d == target_d:
            result.append(node.val)
            return
        collect_level(node.left, target_d, current_d + 1, result)
        collect_level(node.right, target_d, current_d + 1, result)

    height = get_height(root)
    levels = []
    for d in range(height):
        lvl = []
        collect_level(root, d, 0, lvl)
        if lvl:
            levels.append(lvl)
    return levels`
      },
      optimal_solution: {
        language: 'python',
        approach: 'Build tree representation. Use collections.deque for Breadth-First Search initialized with root. In an outer while loop, snapshot level_size = len(queue). Pop exactly level_size nodes into current_level, enqueuing their non-null left and right children. Append current_level to levels.',
        time_complexity: 'O(N)',
        space_complexity: 'O(N)',
        why_this_works: 'A FIFO queue ensures nodes are explored strictly in increasing order of depth. Snapshotting len(queue) isolates each layer without needing to store depth tags on each node, visiting each node exactly once.',
        subgoals: [
          {
            title: 'Base case and tree construction',
            explanation: 'Return empty list if input is empty; instantiate TreeNode objects and wire child pointers.',
            line_range: [2, 16]
          },
          {
            title: 'Initialize FIFO queue with root',
            explanation: 'Import collections.deque and place root node into the traversal queue.',
            line_range: [17, 19]
          },
          {
            title: 'Iterate level by level with queue snapshot',
            explanation: 'While queue has nodes, record level_size = len(queue) and process all nodes in the current tier.',
            line_range: [20, 29]
          },
          {
            title: 'Return collected level tiers',
            explanation: 'Return list of level sublists.',
            line_range: [30, 30]
          }
        ],
        code: `from collections import deque

def layer_order_tree_sweep(tree_nodes):
    if not tree_nodes or tree_nodes[0] is None:
        return []
    class TreeNode:
        def __init__(self, val):
            self.val = val
            self.left = None
            self.right = None
    nodes = [TreeNode(v) if v is not None else None for v in tree_nodes]
    for i in range(len(tree_nodes)):
        if nodes[i] is not None:
            left_idx = 2 * i + 1
            right_idx = 2 * i + 2
            if left_idx < len(tree_nodes):
                nodes[i].left = nodes[left_idx]
            if right_idx < len(tree_nodes):
                nodes[i].right = nodes[right_idx]
    root = nodes[0]
    levels = []
    queue = deque([root])
    while queue:
        level_size = len(queue)
        current_level = []
        for _ in range(level_size):
            node = queue.popleft()
            current_level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        levels.append(current_level)
    return levels`,
        code_lines: [
          { line_number: 1, code: 'from collections import deque', why_this_line: 'Imports double-ended queue for O(1) FIFO popleft and append operations.', is_high_risk: false, risk_note: null },
          { line_number: 2, code: '', why_this_line: 'Blank separator line.', is_high_risk: false, risk_note: null },
          { line_number: 3, code: 'def layer_order_tree_sweep(tree_nodes):', why_this_line: 'Declares function to perform level-order tree sweep.', is_high_risk: false, risk_note: null },
          { line_number: 4, code: '    if not tree_nodes or tree_nodes[0] is None:', why_this_line: 'Guards against empty tree or null root.', is_high_risk: false, risk_note: null },
          { line_number: 5, code: '        return []', why_this_line: 'Returns empty list when no tree exists.', is_high_risk: false, risk_note: null },
          { line_number: 6, code: '    class TreeNode:', why_this_line: 'Standard binary tree node definition.', is_high_risk: false, risk_note: null },
          { line_number: 7, code: '        def __init__(self, val):', why_this_line: 'Constructor initializing node value and children.', is_high_risk: false, risk_note: null },
          { line_number: 8, code: '            self.val = val', why_this_line: 'Assigns node value.', is_high_risk: false, risk_note: null },
          { line_number: 9, code: '            self.left = None', why_this_line: 'Initializes left child to None.', is_high_risk: false, risk_note: null },
          { line_number: 10, code: '            self.right = None', why_this_line: 'Initializes right child to None.', is_high_risk: false, risk_note: null },
          { line_number: 11, code: '    nodes = [TreeNode(v) if v is not None else None for v in tree_nodes]', why_this_line: 'Creates array of TreeNodes from flat input representation.', is_high_risk: false, risk_note: null },
          { line_number: 12, code: '    for i in range(len(tree_nodes)):', why_this_line: 'Connects parent nodes to left and right child nodes using standard binary heap indexing.', is_high_risk: false, risk_note: null },
          { line_number: 13, code: '        if nodes[i] is not None:', why_this_line: 'Only valid nodes have children.', is_high_risk: false, risk_note: null },
          { line_number: 14, code: '            left_idx = 2 * i + 1', why_this_line: 'Computes index of left child: 2*i + 1.', is_high_risk: false, risk_note: null },
          { line_number: 15, code: '            right_idx = 2 * i + 2', why_this_line: 'Computes index of right child: 2*i + 2.', is_high_risk: false, risk_note: null },
          { line_number: 16, code: '            if left_idx < len(tree_nodes):', why_this_line: 'Bounds check for left child.', is_high_risk: false, risk_note: null },
          { line_number: 17, code: '                nodes[i].left = nodes[left_idx]', why_this_line: 'Attaches left child.', is_high_risk: false, risk_note: null },
          { line_number: 18, code: '            if right_idx < len(tree_nodes):', why_this_line: 'Bounds check for right child.', is_high_risk: false, risk_note: null },
          { line_number: 19, code: '                nodes[i].right = nodes[right_idx]', why_this_line: 'Attaches right child.', is_high_risk: false, risk_note: null },
          { line_number: 20, code: '    root = nodes[0]', why_this_line: 'Identifies root node at index 0.', is_high_risk: false, risk_note: null },
          { line_number: 21, code: '    levels = []', why_this_line: 'Accumulator for all level tiers.', is_high_risk: false, risk_note: null },
          { line_number: 22, code: '    queue = deque([root])', why_this_line: 'Initializes FIFO queue with root node.', is_high_risk: false, risk_note: null },
          { line_number: 23, code: '    while queue:', why_this_line: 'Loops until all reachable nodes across all depths have been visited.', is_high_risk: false, risk_note: null },
          { line_number: 24, code: '        level_size = len(queue)', why_this_line: 'Crucial: captures the exact number of nodes belonging to the CURRENT level before enqueuing children.', is_high_risk: true, risk_note: 'Must snapshot len(queue) into a variable before the loop; do not evaluate len(queue) dynamically.' },
          { line_number: 25, code: '        current_level = []', why_this_line: 'Initializes list to collect node values for current tier.', is_high_risk: false, risk_note: null },
          { line_number: 26, code: '        for _ in range(level_size):', why_this_line: 'Pops exactly level_size nodes from queue.', is_high_risk: true, risk_note: 'Guarantees that children added to queue during this iteration belong to the NEXT level.' },
          { line_number: 27, code: '            node = queue.popleft()', why_this_line: 'Pops oldest node from left of queue in O(1).', is_high_risk: false, risk_note: null },
          { line_number: 28, code: '            current_level.append(node.val)', why_this_line: 'Appends node value to current tier list.', is_high_risk: false, risk_note: null },
          { line_number: 29, code: '            if node.left:', why_this_line: 'Enqueues left child if present.', is_high_risk: false, risk_note: null },
          { line_number: 30, code: '                queue.append(node.left)', why_this_line: 'Appends left child to queue.', is_high_risk: false, risk_note: null },
          { line_number: 31, code: '            if node.right:', why_this_line: 'Enqueues right child if present.', is_high_risk: false, risk_note: null },
          { line_number: 32, code: '                queue.append(node.right)', why_this_line: 'Appends right child to queue.', is_high_risk: false, risk_note: null },
          { line_number: 33, code: '        levels.append(current_level)', why_this_line: 'Appends completed tier to output list.', is_high_risk: false, risk_note: null },
          { line_number: 34, code: '    return levels', why_this_line: 'Returns level-grouped traversal output.', is_high_risk: false, risk_note: null }
        ]
      },
      hardest_lines_to_test: [
        {
          line_number: 24,
          code: 'level_size = len(queue)',
          why_it_is_tricky: 'Writing for _ in range(len(queue)) directly without snapshotting or confusing it with dynamic queue size causes levels to merge prematurely.',
          recommended_tests: ['Empty tree [] (must return [])', 'Asymmetric skewed tree [1, 2, None, 3, None]']
        },
        {
          line_number: 27,
          code: 'node = queue.popleft()',
          why_it_is_tricky: 'Using pop() instead of popleft() turns BFS into DFS, reversing node order within levels.',
          recommended_tests: ['Complete binary tree [1, 2, 3, 4, 5, 6, 7]']
        }
      ],
      hints: [
        'What data structure processes nodes in first-in, first-out (FIFO) order? A queue.',
        'At the start of each level, how do you know how many nodes belong to that level? Check len(queue) before adding any children!',
        'Loop exactly level_size times to pop current level nodes and enqueue their children for the next level.'
      ],
      pattern_diagnosis_options: ['two_pointers', 'sliding_window', 'hash_maps', 'breadth_first_search'],
      ai_avoid_keywords: ['level order', 'breadth first', 'queue', 'deque'],
      starter_code: `def layer_order_tree_sweep(tree_nodes: list) -> list[list[int]]:
    """
    Return level order traversal of binary tree nodes as a list of lists.
    """
    pass
`
    },
    {
      id: 'bfs-002',
      slug: 'connected-archipelago-grid-component-count',
      title: 'Connected Archipelago Grid Component Count',
      pattern: 'breadth_first_search',
      difficulty: 'Medium',
      estimated_minutes: 25,
      statement: {
        description: 'Given an m x n 2D binary grid grid_terrain which represents a map of "1"s (land) and "0"s (water), return the number of islands.\\n\\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.',
        input_format: 'grid_terrain: list[list[str]]',
        output_format: 'int representing total island count',
        examples: [
          {
            input: 'grid_terrain = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
            output: '3',
            explanation: 'There are 3 isolated land clusters separated by water.'
          },
          {
            input: 'grid_terrain = [["1","1","1"],["0","1","0"],["1","1","1"]]',
            output: '1',
            explanation: 'All land cells are connected via the central bridge.'
          }
        ],
        constraints: [
          'm == grid_terrain.length',
          'n == grid_terrain[i].length',
          '1 <= m, n <= 300',
          'grid_terrain[i][j] is "0" or "1"'
        ]
      },
      pattern_clues: [
        'Finding connected components on a 2D spatial grid',
        'Exploring in 4 cardinal directions (up, down, left, right) using a queue',
        'Marking visited cells (sinking land to water "0") at enqueue time prevents duplicate visits'
      ],
      trigger_words: ['number of islands', 'connected components', '4 directional flood fill', 'sink island', 'mark at enqueue time'],
      brute_force: {
        approach: 'Scan grid. For each unvisited "1", use recursive DFS to visit all connected land cells. While functional, deep recursion on large grids (300x300 = 90,000 cells) can cause RecursionError in Python without increasing recursion limit.',
        why_it_is_too_slow: 'Recursive call stack exceeds Pythons default recursion depth limit (1000) on large linear components, leading to RecursionError crash.',
        time_complexity: 'O(M * N)',
        space_complexity: 'O(M * N)',
        language: 'python',
        code: `def count_connected_archipelagos(grid_terrain):
    if not grid_terrain:
        return 0
    # Copy grid to avoid mutating outer reference
    grid = [row[:] for row in grid_terrain]
    m, n = len(grid), len(grid[0])
    count = 0
    def dfs(r, c):
        if r < 0 or r >= m or c < 0 or c >= n or grid[r][c] != "1":
            return
        grid[r][c] = "0"
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
    for r in range(m):
        for c in range(n):
            if grid[r][c] == "1":
                count += 1
                dfs(r, c)
    return count`
      },
      optimal_solution: {
        language: 'python',
        approach: 'Iterate through grid. Whenever grid[r][c] == "1", increment island_count and start iterative BFS using collections.deque. Mark (r, c) as "0" immediately upon enqueuing. In the BFS loop, pop (curr_r, curr_c), inspect 4 cardinal neighbors, and for each in-bounds "1", mark it as "0" immediately and enqueue.',
        time_complexity: 'O(M * N)',
        space_complexity: 'O(min(M, N))',
        why_this_works: 'Marking neighbors as visited ("0") at ENQUEUE time rather than at DEQUEUE time prevents the same cell from being enqueued by multiple neighboring nodes, capping queue memory at O(min(M, N)) and avoiding stack overflow.',
        subgoals: [
          {
            title: 'Grid boundary checks and copy setup',
            explanation: 'Validate grid dimensions; copy grid rows to preserve input data purity.',
            line_range: [3, 7]
          },
          {
            title: 'Iterate grid cells to discover island origins',
            explanation: 'Scan matrix for unvisited land "1"; increment island count and bootstrap BFS.',
            line_range: [8, 14]
          },
          {
            title: 'Execute 4-directional BFS flood fill',
            explanation: 'Pop from queue, check 4 cardinal directions, mark land as "0" at enqueue time, and enqueue neighbors.',
            line_range: [15, 23]
          },
          {
            title: 'Return total connected islands',
            explanation: 'Return total island_count after exhausting all cells.',
            line_range: [24, 24]
          }
        ],
        code: `from collections import deque

def count_connected_archipelagos(grid_terrain):
    if not grid_terrain:
        return 0
    grid = [row[:] for row in grid_terrain]
    m, n = len(grid), len(grid[0])
    island_count = 0
    for r in range(m):
        for c in range(n):
            if grid[r][c] == "1":
                island_count += 1
                grid[r][c] = "0"
                queue = deque([(r, c)])
                while queue:
                    curr_r, curr_c = queue.popleft()
                    for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                        nr, nc = curr_r + dr, curr_c + dc
                        if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == "1":
                            grid[nr][nc] = "0"
                            queue.append((nr, nc))
    return island_count`,
        code_lines: [
          { line_number: 1, code: 'from collections import deque', why_this_line: 'Imports deque for fast O(1) queue operations.', is_high_risk: false, risk_note: null },
          { line_number: 2, code: '', why_this_line: 'Blank separator line.', is_high_risk: false, risk_note: null },
          { line_number: 3, code: 'def count_connected_archipelagos(grid_terrain):', why_this_line: 'Declares function to count connected islands in binary grid.', is_high_risk: false, risk_note: null },
          { line_number: 4, code: '    if not grid_terrain:', why_this_line: 'Guards against empty input grid.', is_high_risk: false, risk_note: null },
          { line_number: 5, code: '        return 0', why_this_line: 'Returns 0 when grid has no rows.', is_high_risk: false, risk_note: null },
          { line_number: 6, code: '    grid = [row[:] for row in grid_terrain]', why_this_line: 'Creates mutable copy of grid to avoid mutating original argument.', is_high_risk: false, risk_note: null },
          { line_number: 7, code: '    m, n = len(grid), len(grid[0])', why_this_line: 'Extracts row and column counts.', is_high_risk: false, risk_note: null },
          { line_number: 8, code: '    island_count = 0', why_this_line: 'Tracks total connected land clusters.', is_high_risk: false, risk_note: null },
          { line_number: 9, code: '    for r in range(m):', why_this_line: 'Iterates through each grid row.', is_high_risk: false, risk_note: null },
          { line_number: 10, code: '        for c in range(n):', why_this_line: 'Iterates through each column in current row.', is_high_risk: false, risk_note: null },
          { line_number: 11, code: '            if grid[r][c] == "1":', why_this_line: 'Checks if current cell is unvisited land starting a new island.', is_high_risk: false, risk_note: null },
          { line_number: 12, code: '                island_count += 1', why_this_line: 'Discovered a new island; increment total count.', is_high_risk: false, risk_note: null },
          { line_number: 13, code: '                grid[r][c] = "0"', why_this_line: 'Sinks initial cell to "0" immediately to mark as visited.', is_high_risk: true, risk_note: 'Must mark root cell visited before starting BFS.' },
          { line_number: 14, code: '                queue = deque([(r, c)])', why_this_line: 'Initializes BFS queue with the starting coordinate.', is_high_risk: false, risk_note: null },
          { line_number: 15, code: '                while queue:', why_this_line: 'Processes all connected land cells in the island.', is_high_risk: false, risk_note: null },
          { line_number: 16, code: '                    curr_r, curr_c = queue.popleft()', why_this_line: 'Pops next land cell from front of queue.', is_high_risk: false, risk_note: null },
          { line_number: 17, code: '                    for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:', why_this_line: 'Checks the 4 cardinal directions: Up, Down, Left, Right.', is_high_risk: false, risk_note: null },
          { line_number: 18, code: '                        nr, nc = curr_r + dr, curr_c + dc', why_this_line: 'Computes neighbor cell coordinates.', is_high_risk: false, risk_note: null },
          { line_number: 19, code: '                        if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == "1":', why_this_line: 'Verifies neighbor is within grid bounds and is unvisited land.', is_high_risk: true, risk_note: 'Boundary check must precede grid access to prevent IndexError.' },
          { line_number: 20, code: '                            grid[nr][nc] = "0"', why_this_line: 'Crucial: marks neighbor as visited immediately upon ENQUEUEING.', is_high_risk: true, risk_note: 'Marking visited at enqueue time prevents duplicate enqueuing and exponential memory explosion.' },
          { line_number: 21, code: '                            queue.append((nr, nc))', why_this_line: 'Appends neighbor coordinate to queue.', is_high_risk: false, risk_note: null },
          { line_number: 22, code: '    return island_count', why_this_line: 'Returns total count of distinct islands found.', is_high_risk: false, risk_note: null }
        ]
      },
      hardest_lines_to_test: [
        {
          line_number: 20,
          code: 'grid[nr][nc] = "0"',
          why_it_is_tricky: 'If you mark visited at DEQUEUE time instead of ENQUEUE time, adjacent cells enqueue the same neighbor multiple times, causing memory limit exceeded.',
          recommended_tests: ['Dense solid grid of all "1"s (30x30 all ones must return 1)', 'Alternating checkerboard grid']
        },
        {
          line_number: 19,
          code: 'if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == "1":',
          why_it_is_tricky: 'Evaluating grid[nr][nc] before checking 0 <= nr < m triggers IndexError on boundary cells.',
          recommended_tests: ['Single cell island [["1"]]', 'All water grid [["0", "0"], ["0", "0"]] (must return 0)']
        }
      ],
      hints: [
        'Iterate through the grid. When you encounter a "1", you have found the start of a new island.',
        'From that starting cell, use BFS to explore all 4-directionally connected land cells and sink them by turning them to "0".',
        'Mark cells as "0" at the moment you add them to the queue to prevent enqueuing duplicates.'
      ],
      pattern_diagnosis_options: ['two_pointers', 'sliding_window', 'hash_maps', 'breadth_first_search'],
      ai_avoid_keywords: ['islands', 'breadth first', 'flood fill', 'grid terrain'],
      starter_code: `def count_connected_archipelagos(grid_terrain: list[list[str]]) -> int:
    """
    Return the number of connected land islands in grid_terrain.
    """
    pass
`
    },
    {
      id: 'bfs-003',
      slug: 'multi-source-infection-matrix-contagion',
      title: 'Multi-Source Infection Matrix Contagion',
      pattern: 'breadth_first_search',
      difficulty: 'Medium',
      estimated_minutes: 25,
      statement: {
        description: 'You are given an m x n grid grid_cells where each cell can have one of three values:\\n- 0 representing an empty cell,\\n- 1 representing a fresh server node,\\n- 2 representing an infected server node.\\n\\nEvery minute, any fresh node that is 4-directionally adjacent to an infected node becomes infected.\\n\\nReturn the minimum number of minutes that must elapse until no server node is fresh. If this is impossible, return -1.',
        input_format: 'grid_cells: list[list[int]]',
        output_format: 'int representing elapsed minutes, or -1',
        examples: [
          {
            input: 'grid_cells = [[2,1,1],[1,1,0],[0,1,1]]',
            output: '4',
            explanation: 'The contagion spreads across the 3x3 grid in 4 minutes.'
          },
          {
            input: 'grid_cells = [[2,1,1],[0,1,1],[1,0,1]]',
            output: '-1',
            explanation: 'The node at bottom-left (2, 0) is never infected because water/empty walls isolate it.'
          }
        ],
        constraints: [
          'm == grid_cells.length',
          'n == grid_cells[i].length',
          '1 <= m, n <= 10',
          'grid_cells[i][j] is 0, 1, or 2'
        ]
      },
      pattern_clues: [
        'All initially infected nodes spread simultaneously at minute 0, requiring Multi-Source BFS',
        'Shortest time to reach all nodes in unweighted state space is solved by level-order traversal',
        'Tracking fresh node count lets us detect whether any nodes remain unreached without re-scanning'
      ],
      trigger_words: ['rotting oranges', 'multi-source BFS', 'simultaneous spread', 'infection matrix', 'elapsed minutes'],
      brute_force: {
        approach: 'Step minute by minute. In each round, scan the entire M x N matrix, find all 1s adjacent to 2s, create a grid copy, update the infected cells, and repeat until no new cells become infected. Check if any fresh cells remain.',
        why_it_is_too_slow: 'Scanning the entire grid on every time step takes O((M * N)^2) time. While feasible for tiny grids, it does not use the optimal O(M * N) Multi-Source queue.',
        time_complexity: 'O((M * N)^2)',
        space_complexity: 'O(M * N)',
        language: 'python',
        code: `def min_minutes_for_contagion_spread(grid_cells):
    grid = [row[:] for row in grid_cells]
    m, n = len(grid), len(grid[0])
    minutes = 0
    while True:
        to_infect = []
        for r in range(m):
            for c in range(n):
                if grid[r][c] == 2:
                    for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                        nr, nc = r + dr, c + dc
                        if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1:
                            to_infect.append((nr, nc))
        if not to_infect:
            break
        for r, c in to_infect:
            grid[r][c] = 2
        minutes += 1
    for r in range(m):
        for c in range(n):
            if grid[r][c] == 1:
                return -1
    return minutes`
      },
      optimal_solution: {
        language: 'python',
        approach: 'Enqueue all initial infected nodes (val == 2) into a FIFO queue at minute 0, and count total fresh nodes. If fresh == 0, return 0. While queue has items and fresh > 0, increment minutes and process current wave (snapshotting len(queue)). For each popped node, infect 4-directionally adjacent fresh nodes, decrement fresh_count, and enqueue them. Return minutes if fresh == 0 else -1.',
        time_complexity: 'O(M * N)',
        space_complexity: 'O(M * N)',
        why_this_works: 'By enqueuing all initial sources simultaneously, the queue processes the infection wave by wave. Checking fresh > 0 in the while condition ensures we do not increment minutes for an empty trailing wave.',
        subgoals: [
          {
            title: 'Initial scan for sources and fresh count',
            explanation: 'Scan grid once: enqueue all coordinates with value 2 and count fresh nodes with value 1.',
            line_range: [4, 15]
          },
          {
            title: 'Multi-source level-by-level BFS spread',
            explanation: 'While queue has nodes and fresh > 0, advance minutes and infect all 4-directional fresh neighbors.',
            line_range: [16, 27]
          },
          {
            title: 'Return elapsed minutes or failure',
            explanation: 'Return minutes if all fresh nodes were reached, otherwise return -1.',
            line_range: [28, 28]
          }
        ],
        code: `from collections import deque

def min_minutes_for_contagion_spread(grid_cells):
    grid = [row[:] for row in grid_cells]
    m, n = len(grid), len(grid[0])
    queue = deque()
    fresh_count = 0
    for r in range(m):
        for c in range(n):
            if grid[r][c] == 2:
                queue.append((r, c))
            elif grid[r][c] == 1:
                fresh_count += 1
    if fresh_count == 0:
        return 0
    minutes = 0
    while queue and fresh_count > 0:
        minutes += 1
        for _ in range(len(queue)):
            r, c = queue.popleft()
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1:
                    grid[nr][nc] = 2
                    fresh_count -= 1
                    queue.append((nr, nc))
    return minutes if fresh_count == 0 else -1`,
        code_lines: [
          { line_number: 1, code: 'from collections import deque', why_this_line: 'Imports deque for FIFO multi-source wave processing.', is_high_risk: false, risk_note: null },
          { line_number: 2, code: '', why_this_line: 'Blank separator line.', is_high_risk: false, risk_note: null },
          { line_number: 3, code: 'def min_minutes_for_contagion_spread(grid_cells):', why_this_line: 'Declares function to find minimum minutes for infection spread.', is_high_risk: false, risk_note: null },
          { line_number: 4, code: '    grid = [row[:] for row in grid_cells]', why_this_line: 'Creates grid copy to mutate cell states without altering input.', is_high_risk: false, risk_note: null },
          { line_number: 5, code: '    m, n = len(grid), len(grid[0])', why_this_line: 'Extracts matrix dimensions.', is_high_risk: false, risk_note: null },
          { line_number: 6, code: '    queue = deque()', why_this_line: 'Initializes queue to store active infection wavefront.', is_high_risk: false, risk_note: null },
          { line_number: 7, code: '    fresh_count = 0', why_this_line: 'Counter for remaining uninfected nodes.', is_high_risk: false, risk_note: null },
          { line_number: 8, code: '    for r in range(m):', why_this_line: 'Scans matrix rows to locate initial sources and count fresh nodes.', is_high_risk: false, risk_note: null },
          { line_number: 9, code: '        for c in range(n):', why_this_line: 'Scans matrix columns.', is_high_risk: false, risk_note: null },
          { line_number: 10, code: '            if grid[r][c] == 2:', why_this_line: 'Identifies an initially infected node.', is_high_risk: false, risk_note: null },
          { line_number: 11, code: '                queue.append((r, c))', why_this_line: 'Enqueues all initial sources at time 0.', is_high_risk: true, risk_note: 'Multi-source BFS requires enqueuing ALL initial sources before starting the time loop.' },
          { line_number: 12, code: '            elif grid[r][c] == 1:', why_this_line: 'Identifies fresh node.', is_high_risk: false, risk_note: null },
          { line_number: 13, code: '                fresh_count += 1', why_this_line: 'Increments fresh node tally.', is_high_risk: false, risk_note: null },
          { line_number: 14, code: '    if fresh_count == 0:', why_this_line: 'Edge case: if no fresh nodes existed initially, 0 minutes elapsed.', is_high_risk: true, risk_note: 'Must return 0 immediately if fresh_count is 0.' },
          { line_number: 15, code: '        return 0', why_this_line: 'Returns 0 minutes.', is_high_risk: false, risk_note: null },
          { line_number: 16, code: '    minutes = 0', why_this_line: 'Time counter for elapsed minutes.', is_high_risk: false, risk_note: null },
          { line_number: 17, code: '    while queue and fresh_count > 0:', why_this_line: 'Continues while waves remain and fresh nodes still exist.', is_high_risk: true, risk_note: 'Condition fresh_count > 0 prevents incrementing minutes for the final wave when no new nodes can be infected.' },
          { line_number: 18, code: '        minutes += 1', why_this_line: 'Advances elapsed time by 1 minute for this wave.', is_high_risk: false, risk_note: null },
          { line_number: 19, code: '        for _ in range(len(queue)):', why_this_line: 'Snapshots current wave size and processes all current sources.', is_high_risk: false, risk_note: null },
          { line_number: 20, code: '            r, c = queue.popleft()', why_this_line: 'Pops infected node from wave.', is_high_risk: false, risk_note: null },
          { line_number: 21, code: '            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:', why_this_line: 'Inspects 4 cardinal neighbor directions.', is_high_risk: false, risk_note: null },
          { line_number: 22, code: '                nr, nc = r + dr, c + dc', why_this_line: 'Computes neighbor coordinates.', is_high_risk: false, risk_note: null },
          { line_number: 23, code: '                if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1:', why_this_line: 'Checks if neighbor is in bounds and currently fresh.', is_high_risk: false, risk_note: null },
          { line_number: 24, code: '                    grid[nr][nc] = 2', why_this_line: 'Mutates neighbor to infected (visited) state.', is_high_risk: true, risk_note: 'Must mark neighbor as 2 immediately to prevent redundant enqueuing.' },
          { line_number: 25, code: '                    fresh_count -= 1', why_this_line: 'Decrements count of remaining fresh nodes.', is_high_risk: false, risk_note: null },
          { line_number: 26, code: '                    queue.append((nr, nc))', why_this_line: 'Enqueues newly infected node for next wave.', is_high_risk: false, risk_note: null },
          { line_number: 27, code: '    return minutes if fresh_count == 0 else -1', why_this_line: 'Returns elapsed minutes if all fresh nodes were infected; otherwise returns -1.', is_high_risk: false, risk_note: null }
        ]
      },
      hardest_lines_to_test: [
        {
          line_number: 17,
          code: 'while queue and fresh_count > 0:',
          why_it_is_tricky: 'Omitting fresh_count > 0 increments minutes an extra time when popping the final wave of infected nodes even though no fresh nodes were left.',
          recommended_tests: ['No fresh nodes at all [[2, 2], [0, 2]] (must return 0)', 'Single fresh node adjacent to multiple infected [[2, 1, 2]] (must return 1)']
        },
        {
          line_number: 14,
          code: 'if fresh_count == 0: return 0',
          why_it_is_tricky: 'Failing to handle fresh_count == 0 at the start can cause the function to return -1 or crash if queue is empty.',
          recommended_tests: ['All empty cells [[0, 0], [0, 0]] (must return 0)']
        }
      ],
      hints: [
        'Notice that all infected nodes spread simultaneously. How can you handle multiple starting points? Enqueue all of them before starting the search!',
        'How can you tell how many minutes have passed? Process nodes level-by-level, incrementing a minute counter per layer.',
        'Keep track of how many fresh nodes exist so you can immediately tell if any were unreachable.'
      ],
      pattern_diagnosis_options: ['two_pointers', 'sliding_window', 'hash_maps', 'breadth_first_search'],
      ai_avoid_keywords: ['multi source', 'infection', 'rotting oranges', 'contagion'],
      starter_code: `def min_minutes_for_contagion_spread(grid_cells: list[list[int]]) -> int:
    """
    Return minimum minutes until no fresh nodes remain, or -1.
    """
    pass
`
    },
    {
      id: 'bfs-004',
      slug: 'eight-way-grid-coordinate-flood-sweep',
      title: 'Eight-Way Grid Coordinate Flood Sweep',
      pattern: 'breadth_first_search',
      difficulty: 'Medium',
      estimated_minutes: 25,
      statement: {
        description: 'Given an n x n binary matrix grid_terrain, return the length of the shortest clear path in the matrix. If there is no clear path, return -1.\\n\\nA clear path in a binary matrix is a path from the top-left cell (i.e., (0, 0)) to the bottom-right cell (i.e., (n - 1, n - 1)) such that:\\n- All the visited cells of the path are 0.\\n- All the adjacent cells of the path are 8-directionally connected (i.e., they are different and share an edge or a corner).\\n\\nThe length of a clear path is the number of visited cells of this path.',
        input_format: 'grid_terrain: list[list[int]]',
        output_format: 'int representing length of shortest clear path, or -1',
        examples: [
          {
            input: 'grid_terrain = [[0, 0, 0], [1, 1, 0], [1, 1, 0]]',
            output: '4',
            explanation: 'The shortest clear path is (0,0) -> (0,1) -> (1,2) -> (2,2), which visits 4 cells.'
          },
          {
            input: 'grid_terrain = [[1, 0, 0], [1, 1, 0], [1, 1, 0]]',
            output: '-1',
            explanation: 'The starting cell (0, 0) is blocked by a 1, so no clear path can begin.'
          }
        ],
        constraints: [
          'n == grid_terrain.length',
          'n == grid_terrain[i].length',
          '1 <= n <= 100',
          'grid_terrain[i][j] is 0 or 1'
        ]
      },
      pattern_clues: [
        'Finding the SHORTEST path in an unweighted grid with unit step weights',
        'Breadth-First Search guarantees the first arrival at the target cell is via the shortest path',
        'Movement is allowed in 8 directions (including diagonals), which requires iterating over 8 direction offsets'
      ],
      trigger_words: ['shortest path binary matrix', '8-directionally connected', 'diagonal movement', 'unweighted grid bfs', 'unit step cost'],
      brute_force: {
        approach: 'Use recursive backtracking DFS exploring all 8 directional moves from (0, 0) to (n - 1, n - 1), tracking path length and visited set to find the minimum length.',
        why_it_is_too_slow: 'Backtracking explores up to 8^(N^2) paths across diagonal intersections, branching exponentially and causing a catastrophic timeout.',
        time_complexity: 'O(8^(N^2))',
        space_complexity: 'O(N^2)',
        language: 'python',
        code: `def shortest_path_binary_matrix_8way(grid_terrain):
    n = len(grid_terrain)
    if grid_terrain[0][0] != 0 or grid_terrain[n - 1][n - 1] != 0:
        return -1
    if n == 1:
        return 1
    min_dist = float('inf')
    visited = set([(0, 0)])
    directions = [(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)]
    def dfs(r, c, dist):
        nonlocal min_dist
        if dist >= min_dist:
            return
        if r == n - 1 and c == n - 1:
            min_dist = min(min_dist, dist)
            return
        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if 0 <= nr < n and 0 <= nc < n and grid_terrain[nr][nc] == 0 and (nr, nc) not in visited:
                visited.add((nr, nc))
                dfs(nr, nc, dist + 1)
                visited.remove((nr, nc))
    dfs(0, 0, 1)
    return min_dist if min_dist != float('inf') else -1`
      },
      optimal_solution: {
        language: 'python',
        approach: 'Check if (0, 0) or (n - 1, n - 1) is blocked (!= 0); if so return -1. Use BFS with collections.deque storing tuples (r, c, distance), starting with (0, 0, 1). Mark (0, 0) as 1 (visited). While queue has elements, pop (r, c, dist). If (r, c) is (n - 1, n - 1), return dist immediately. Otherwise, explore all 8 directions, mark valid open neighbors as 1, and enqueue (nr, nc, dist + 1). Return -1 if queue empties.',
        time_complexity: 'O(N^2)',
        space_complexity: 'O(N^2)',
        why_this_works: 'BFS explores nodes in order of non-decreasing distance from the source. The first time the destination (n - 1, n - 1) is dequeued, its distance is guaranteed to be minimal. Marking visited at enqueue time ensures each cell is processed at most once.',
        subgoals: [
          {
            title: 'Validate boundary endpoints',
            explanation: 'Verify that start cell (0, 0) and goal cell (n - 1, n - 1) are both unblocked (value 0).',
            line_range: [4, 8]
          },
          {
            title: 'Initialize 8-directional BFS queue',
            explanation: 'Define 8 directional offsets; enqueue start cell (0, 0, 1) and mark start as visited.',
            line_range: [9, 13]
          },
          {
            title: 'Explore 8 neighbors and return shortest path',
            explanation: 'Pop cell; return distance immediately if goal reached; enqueue in-bounds open neighbors with dist + 1.',
            line_range: [14, 23]
          }
        ],
        code: `from collections import deque

def shortest_path_binary_matrix_8way(grid_terrain):
    n = len(grid_terrain)
    if grid_terrain[0][0] != 0 or grid_terrain[n - 1][n - 1] != 0:
        return -1
    if n == 1:
        return 1
    grid = [row[:] for row in grid_terrain]
    directions = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]
    queue = deque([(0, 0, 1)])
    grid[0][0] = 1
    while queue:
        r, c, dist = queue.popleft()
        if r == n - 1 and c == n - 1:
            return dist
        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 0:
                grid[nr][nc] = 1
                queue.append((nr, nc, dist + 1))
    return -1`,
        code_lines: [
          { line_number: 1, code: 'from collections import deque', why_this_line: 'Imports deque for FIFO BFS path exploration.', is_high_risk: false, risk_note: null },
          { line_number: 2, code: '', why_this_line: 'Blank separator line.', is_high_risk: false, risk_note: null },
          { line_number: 3, code: 'def shortest_path_binary_matrix_8way(grid_terrain):', why_this_line: 'Declares function finding shortest 8-directional clear path in binary matrix.', is_high_risk: false, risk_note: null },
          { line_number: 4, code: '    n = len(grid_terrain)', why_this_line: 'Extracts grid dimension n.', is_high_risk: false, risk_note: null },
          { line_number: 5, code: '    if grid_terrain[0][0] != 0 or grid_terrain[n - 1][n - 1] != 0:', why_this_line: 'Essential endpoint guard: path cannot exist if start or destination cell is blocked by 1.', is_high_risk: true, risk_note: 'Must verify both (0, 0) and (n-1, n-1) are 0.' },
          { line_number: 6, code: '        return -1', why_this_line: 'Returns -1 immediately if start or goal is blocked.', is_high_risk: false, risk_note: null },
          { line_number: 7, code: '    if n == 1:', why_this_line: 'Single cell grid [0] is already at destination.', is_high_risk: false, risk_note: null },
          { line_number: 8, code: '        return 1', why_this_line: 'Returns path length 1 for 1x1 clear grid.', is_high_risk: false, risk_note: null },
          { line_number: 9, code: '    grid = [row[:] for row in grid_terrain]', why_this_line: 'Creates mutable copy of grid for marking visited cells.', is_high_risk: false, risk_note: null },
          { line_number: 10, code: '    directions = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]', why_this_line: 'All 8 cardinal and diagonal direction offsets.', is_high_risk: true, risk_note: 'Must include all 8 directions: cardinal and diagonal.' },
          { line_number: 11, code: '    queue = deque([(0, 0, 1)])', why_this_line: 'Initializes queue with (row, col, distance = 1).', is_high_risk: false, risk_note: null },
          { line_number: 12, code: '    grid[0][0] = 1', why_this_line: 'Marks starting cell as visited (blocked) to prevent revisiting.', is_high_risk: false, risk_note: null },
          { line_number: 13, code: '    while queue:', why_this_line: 'Loops while open paths exist to explore.', is_high_risk: false, risk_note: null },
          { line_number: 14, code: '        r, c, dist = queue.popleft()', why_this_line: 'Dequeues cell with shortest distance from origin.', is_high_risk: false, risk_note: null },
          { line_number: 15, code: '        if r == n - 1 and c == n - 1:', why_this_line: 'First arrival at bottom-right is guaranteed shortest path.', is_high_risk: false, risk_note: null },
          { line_number: 16, code: '            return dist', why_this_line: 'Returns minimum path length found.', is_high_risk: false, risk_note: null },
          { line_number: 17, code: '        for dr, dc in directions:', why_this_line: 'Explores each of the 8 neighbor directions.', is_high_risk: false, risk_note: null },
          { line_number: 18, code: '            nr, nc = r + dr, c + dc', why_this_line: 'Computes neighbor coordinates.', is_high_risk: false, risk_note: null },
          { line_number: 19, code: '            if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 0:', why_this_line: 'Checks bounds and verifies neighbor cell is an open path (value 0).', is_high_risk: false, risk_note: null },
          { line_number: 20, code: '                grid[nr][nc] = 1', why_this_line: 'Marks neighbor visited immediately at enqueue time.', is_high_risk: true, risk_note: 'Marking visited at enqueue time prevents duplicate queue entries.' },
          { line_number: 21, code: '                queue.append((nr, nc, dist + 1))', why_this_line: 'Enqueues neighbor with incremented distance.', is_high_risk: false, risk_note: null },
          { line_number: 22, code: '    return -1', why_this_line: 'Returns -1 if destination was never reached.', is_high_risk: false, risk_note: null }
        ]
      },
      hardest_lines_to_test: [
        {
          line_number: 5,
          code: 'if grid_terrain[0][0] != 0 or grid_terrain[n - 1][n - 1] != 0:',
          why_it_is_tricky: 'If grid_terrain[0][0] == 1, no path can start; if grid_terrain[n-1][n-1] == 1, no path can end.',
          recommended_tests: ['Start blocked [[1, 0], [0, 0]] (must return -1)', 'End blocked [[0, 0], [0, 1]] (must return -1)']
        },
        {
          line_number: 7,
          code: 'if n == 1: return 1',
          why_it_is_tricky: 'For 1x1 clear grid [[0]], distance is 1 (the single start/end cell).',
          recommended_tests: ['1x1 grid [[0]] (must return 1)']
        }
      ],
      hints: [
        'Because all moves have equal cost (1 step), what algorithm finds the shortest path? BFS!',
        'Check edge cases first: what if (0, 0) or (n-1, n-1) is blocked by a 1?',
        'Remember that movements can be diagonal as well as horizontal/vertical (8 directions total).'
      ],
      pattern_diagnosis_options: ['two_pointers', 'sliding_window', 'hash_maps', 'breadth_first_search'],
      ai_avoid_keywords: ['shortest path', 'binary matrix', '8-way', 'diagonal'],
      starter_code: `def shortest_path_binary_matrix_8way(grid_terrain: list[list[int]]) -> int:
    """
    Return shortest 8-directional clear path length from (0,0) to (n-1,n-1), or -1.
    """
    pass
`
    },
    {
      id: 'bfs-005',
      slug: 'word-ladder-shortest-transformation-sequence',
      title: 'Word Ladder Shortest Transformation Sequence',
      pattern: 'breadth_first_search',
      difficulty: 'Hard',
      estimated_minutes: 35,
      statement: {
        description: 'A transformation sequence from word begin_word to word end_word using a dictionary word_list is a sequence of words begin_word -> s1 -> s2 -> ... -> sk such that:\\n- Every adjacent pair of words differs by a single letter.\\n- Every si for 1 <= i <= k is in word_list. Note that begin_word does not need to be in word_list.\\n- sk == end_word.\\n\\nGiven two words, begin_word and end_word, and a dictionary word_list, return the number of words in the shortest transformation sequence from begin_word to end_word, or 0 if no such sequence exists.',
        input_format: 'begin_word: str, end_word: str, word_list: list[str]',
        output_format: 'int representing number of words in shortest transformation sequence, or 0',
        examples: [
          {
            input: 'begin_word = "hit", end_word = "cog", word_list = ["hot","dot","dog","lot","log","cog"]',
            output: '5',
            explanation: 'One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> "cog", which is 5 words long.'
          },
          {
            input: 'begin_word = "hit", end_word = "cog", word_list = ["hot","dot","dog","lot","log"]',
            output: '0',
            explanation: 'The end_word "cog" is not in word_list, therefore there is no valid transformation sequence.'
          }
        ],
        constraints: [
          '1 <= begin_word.length <= 10',
          'end_word.length == begin_word.length',
          '1 <= word_list.length <= 5,000',
          'word_list[i].length == begin_word.length',
          'begin_word, end_word, and word_list[i] consist of lowercase English letters',
          'begin_word != end_word',
          'All words in word_list are unique'
        ]
      },
      pattern_clues: [
        'Shortest path in unweighted state space (words are graph nodes, single-letter edits are edges)',
        'Level-order BFS ensures the first time end_word is reached, it is via the shortest sequence',
        'Generating next words by substituting 26 letters takes O(26 * L) per word instead of comparing against all N words'
      ],
      trigger_words: ['word ladder', 'shortest transformation', 'single letter difference', 'unweighted graph bfs', 'word graph'],
      brute_force: {
        approach: 'Use recursive backtracking DFS exploring all valid single-letter word transitions in word_list, maintaining a visited set to find the path with minimum word count.',
        why_it_is_too_slow: 'Backtracking explores factorial O(N!) word permutations, causing a severe recursion timeout for lists of thousands of words.',
        time_complexity: 'O(N!)',
        space_complexity: 'O(N)',
        language: 'python',
        code: `def shortest_transformation_sequence(begin_word, end_word, word_list):
    words = set(word_list)
    if end_word not in words:
        return 0
    min_len = float('inf')
    visited = set([begin_word])
    def diff_by_one(w1, w2):
        return sum(c1 != c2 for c1, c2 in zip(w1, w2)) == 1
    def dfs(curr, count):
        nonlocal min_len
        if count >= min_len:
            return
        if curr == end_word:
            min_len = min(min_len, count)
            return
        for w in word_list:
            if w not in visited and diff_by_one(curr, w):
                visited.add(w)
                dfs(w, count + 1)
                visited.remove(w)
    dfs(begin_word, 1)
    return min_len if min_len != float('inf') else 0`
      },
      optimal_solution: {
        language: 'python',
        approach: 'Convert word_list to a hash set words for O(1) removals. If end_word not in words, return 0. Use BFS with collections.deque storing (current_word, depth), starting with (begin_word, 1). For each word, try replacing each character with all 26 lowercase letters. If neighbor in words, remove it from words (marking visited) and enqueue (neighbor, depth + 1). If neighbor == end_word, return depth + 1 immediately.',
        time_complexity: 'O(N * L * 26)',
        space_complexity: 'O(N * L)',
        why_this_works: 'By mutating each of the L character positions across 26 letters, finding valid neighbors takes O(26 * L) instead of comparing against all N words (O(N * L)). Breadth-first search guarantees the first time end_word is encountered, depth is minimal.',
        subgoals: [
          {
            title: 'Endpoint validation and word set setup',
            explanation: 'Convert word_list to hash set; return 0 immediately if end_word is absent.',
            line_range: [4, 7]
          },
          {
            title: 'Initialize BFS queue with begin word',
            explanation: 'Initialize FIFO queue with (begin_word, 1) where 1 is the starting sequence length.',
            line_range: [8, 8]
          },
          {
            title: 'Expand single-character variations and traverse',
            explanation: 'Pop word; try all 26 letter replacements per position; enqueue match and remove from set to prevent cycles.',
            line_range: [9, 21]
          },
          {
            title: 'Return zero on unreachable target',
            explanation: 'Return 0 if queue empties without reaching end_word.',
            line_range: [22, 22]
          }
        ],
        code: `from collections import deque

def shortest_transformation_sequence(begin_word, end_word, word_list):
    words = set(word_list)
    if end_word not in words:
        return 0
    queue = deque([(begin_word, 1)])
    while queue:
        current_word, length = queue.popleft()
        if current_word == end_word:
            return length
        for i in range(len(current_word)):
            for ch in 'abcdefghijklmnopqrstuvwxyz':
                if ch != current_word[i]:
                    next_word = current_word[:i] + ch + current_word[i + 1:]
                    if next_word in words:
                        words.remove(next_word)
                        queue.append((next_word, length + 1))
    return 0`,
        code_lines: [
          { line_number: 1, code: 'from collections import deque', why_this_line: 'Imports deque for FIFO level-order state queue.', is_high_risk: false, risk_note: null },
          { line_number: 2, code: '', why_this_line: 'Blank separator line.', is_high_risk: false, risk_note: null },
          { line_number: 3, code: 'def shortest_transformation_sequence(begin_word, end_word, word_list):', why_this_line: 'Declares function to find shortest transformation sequence length.', is_high_risk: false, risk_note: null },
          { line_number: 4, code: '    words = set(word_list)', why_this_line: 'Converts word list to hash set for O(1) lookup and removal.', is_high_risk: false, risk_note: null },
          { line_number: 5, code: '    if end_word not in words:', why_this_line: 'Edge case guard: if destination word is not in dictionary, sequence is impossible.', is_high_risk: true, risk_note: 'Must return 0 if end_word is absent from word_list.' },
          { line_number: 6, code: '        return 0', why_this_line: 'Returns 0 for impossible target.', is_high_risk: false, risk_note: null },
          { line_number: 7, code: '    queue = deque([(begin_word, 1)])', why_this_line: 'Initializes BFS queue with (word, sequence_length = 1).', is_high_risk: false, risk_note: null },
          { line_number: 8, code: '    while queue:', why_this_line: 'Loops while reachable transformation states exist.', is_high_risk: false, risk_note: null },
          { line_number: 9, code: '        current_word, length = queue.popleft()', why_this_line: 'Pops earliest explored word and its sequence length.', is_high_risk: false, risk_note: null },
          { line_number: 10, code: '        if current_word == end_word:', why_this_line: 'Checks if target word has been reached.', is_high_risk: false, risk_note: null },
          { line_number: 11, code: '            return length', why_this_line: 'Returns shortest sequence length immediately upon first arrival.', is_high_risk: false, risk_note: null },
          { line_number: 12, code: '        for i in range(len(current_word)):', why_this_line: 'Iterates through each character position in current word.', is_high_risk: false, risk_note: null },
          { line_number: 13, code: '            for ch in "abcdefghijklmnopqrstuvwxyz":', why_this_line: 'Tries all 26 lowercase English letter substitutions.', is_high_risk: false, risk_note: null },
          { line_number: 14, code: '                if ch != current_word[i]:', why_this_line: 'Only inspects characters that differ from current character.', is_high_risk: false, risk_note: null },
          { line_number: 15, code: '                    next_word = current_word[:i] + ch + current_word[i + 1:]', why_this_line: 'Constructs candidate neighboring word with 1-character difference.', is_high_risk: false, risk_note: null },
          { line_number: 16, code: '                    if next_word in words:', why_this_line: 'Checks if candidate word exists in dictionary in O(1).', is_high_risk: false, risk_note: null },
          { line_number: 17, code: '                        words.remove(next_word)', why_this_line: 'Removes word from set immediately upon enqueuing to prevent cycles and duplicate visits.', is_high_risk: true, risk_note: 'words.remove() acts as the visited set, saving memory and preventing cycles.' },
          { line_number: 18, code: '                        queue.append((next_word, length + 1))', why_this_line: 'Enqueues neighboring word with incremented sequence length.', is_high_risk: false, risk_note: null },
          { line_number: 19, code: '    return 0', why_this_line: 'Returns 0 if end_word could not be reached.', is_high_risk: false, risk_note: null }
        ]
      },
      hardest_lines_to_test: [
        {
          line_number: 5,
          code: 'if end_word not in words: return 0',
          why_it_is_tricky: 'If end_word is not in word_list, the algorithm would spin through the entire queue before returning 0.',
          recommended_tests: ['end_word not in word_list (must return 0 immediately)', 'begin_word can directly reach end_word in 2 steps "a" -> "c" with ["c"]']
        },
        {
          line_number: 17,
          code: 'words.remove(next_word)',
          why_it_is_tricky: 'Forgetting to remove next_word from words allows endless cycling between words like "hot" <-> "dot".',
          recommended_tests: ['Cycle graph words ["hot", "dot", "dog", "cog"]']
        }
      ],
      hints: [
        'Think of this as a graph problem: words are nodes, and an edge exists between two words if they differ by exactly one letter.',
        'To find the SHORTEST transformation sequence, which graph traversal is optimal? BFS.',
        'Instead of comparing every word in word_list to your current word (O(N)), generate all 26 * L possible 1-letter variations and check if they exist in your word set (O(26 * L)).'
      ],
      pattern_diagnosis_options: ['two_pointers', 'sliding_window', 'hash_maps', 'breadth_first_search'],
      ai_avoid_keywords: ['word ladder', 'shortest transformation', 'begin_word', 'end_word'],
      starter_code: `def shortest_transformation_sequence(begin_word: str, end_word: str, word_list: list[str]) -> int:
    """
    Return number of words in shortest transformation sequence, or 0.
    """
    pass
`
    }
  ];
}
