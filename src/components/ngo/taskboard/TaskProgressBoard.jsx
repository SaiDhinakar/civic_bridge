import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { IconTasks, IconLocation, IconUsers, IconCalendar } from './Icons';
import { getAllAssignments } from '../../../utils/aiMatcher';
import { fetchJSON } from '../../../utils/dataLoader';

const TaskProgressBoard = ({ completionRate, categoryProgress, tasks }) => {
  const [cols, setCols] = useState({ Open: [], Recommended: [], Assigned: [], 'In Progress': [], Completed: [] });

  const regroup = async () => {
    if (!tasks) return;
    const assignments = getAllAssignments() || {};

    // try to fetch AI task metadata to merge into task entries
    let aiTasks = [];
    let aiVols = [];
    try {
      aiTasks = await fetchJSON("../data/ai/tasks.json", 0);
    } catch (e) {
      aiTasks = [];
    }
    try {
      aiVols = await fetchJSON("../data/ai/volunteers.json", 0);
    } catch (e) {
      aiVols = [];
    }

    const grouped = { Open: [], Recommended: [], Assigned: [], 'In Progress': [], Completed: [] };
    tasks.forEach((t) => {
      const task = { ...t };
      const a = assignments[task.id];
      const accepted = a && Object.values(a).some((v) => v === 'accepted');
      if (accepted) {
        task.state = 'Assigned';
      } else if (ai) {
        // If AI knows about this task and there's no acceptance yet, mark as Recommended
        task.state = 'Recommended';
      }

      // merge AI metadata when available (prefer AI data for title/location/volunteers/deadline/priority)
      const ai = aiTasks.find((x) => x.id === task.id);
      if (ai) {
        task.title = ai.title || task.title;
        task.location = ai.location || task.location;
        task.volunteers = ai.volunteersNeeded || task.volunteers;
        task.deadline = ai.date || task.deadline;
        // map urgency -> priority if priority missing
        if (ai.urgency && !task.priority) {
          const map = { urgent: 'Urgent', high: 'High', medium: 'Medium', low: 'Low' };
          task.priority = map[ai.urgency.toLowerCase()] || ai.urgency;
        }
      }

      // attach assigned volunteers info from assignments and aiVols
      task.assigned = [];
      const aMap = assignments[task.id] || {};
      Object.keys(aMap).forEach((volId) => {
        if (aMap[volId] === 'accepted') {
          const vol = aiVols.find((v) => v.id === volId);
          if (vol) task.assigned.push(vol);
        }
      });

      grouped[task.state] ? grouped[task.state].push(task) : grouped.Open.push(task);
    });
    setCols(grouped);
  };

  useEffect(() => {
    regroup();
    const handler = () => regroup();
    window.addEventListener('ai:assignmentsUpdated', handler);
    return () => window.removeEventListener('ai:assignmentsUpdated', handler);
  }, [tasks]);

  if (!tasks) {
    return null;
  }

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    const srcId = source.droppableId;
    const destId = destination.droppableId;
    if (srcId === destId && source.index === destination.index) return;

    const sourceList = Array.from(cols[srcId]);
    const [moved] = sourceList.splice(source.index, 1);
    const destList = Array.from(cols[destId]);

    // update task state when moved between columns
    const updated = { ...moved, state: destId };

    destList.splice(destination.index, 0, updated);

    setCols((prev) => ({ ...prev, [srcId]: sourceList, [destId]: destList }));
  };

  const columnOrder = ['Open', 'Recommended', 'Assigned', 'In Progress', 'Completed'];

  const total = Object.values(cols).reduce((s, a) => s + a.length, 0);

  return (
    <section className="ngo-kanban-board">
      <div className="ngo-summary-grid">
        <div className="ngo-summary-card">
          <div className="ngo-summary-icon"><IconTasks /></div>
          <div>
            <div className="ngo-summary-count">{total}</div>
            <div className="ngo-summary-sub">Total Tasks</div>
          </div>
        </div>
        <div className="ngo-summary-card">
          <div className="ngo-summary-icon"><svg width="18" height="18"><circle cx="9" cy="9" r="8" fill="#d1fae5"/></svg></div>
          <div>
            <div className="ngo-summary-count">{cols.Open.length}</div>
            <div className="ngo-summary-sub">Open</div>
          </div>
        </div>
        <div className="ngo-summary-card">
          <div className="ngo-summary-icon"><svg width="18" height="18"><rect width="18" height="12" rx="2" fill="#fef3c7"/></svg></div>
          <div>
            <div className="ngo-summary-count">{cols['In Progress'].length}</div>
            <div className="ngo-summary-sub">In Progress</div>
          </div>
        </div>
        <div className="ngo-summary-card">
          <div className="ngo-summary-icon"><svg width="18" height="18"><path d="M6 10l2 2 6-6" stroke="#10b981" strokeWidth="1.6" fill="none"/></svg></div>
          <div>
            <div className="ngo-summary-count">{cols.Completed.length}</div>
            <div className="ngo-summary-sub">Completed</div>
          </div>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="ngo-kanban">
          {columnOrder.map((colName) => (
            <Droppable droppableId={colName} key={colName}>
              {(provided) => (
                <article className="card ngo-kanban-col" ref={provided.innerRef} {...provided.droppableProps}>
                  <div className="ngo-kanban-col-head">
                    <h3>{colName}</h3>
                    <div className="ngo-kanban-col-count">{cols[colName].length}</div>
                  </div>

                  <div className="ngo-kanban-stack">
                    {cols[colName].map((task, idx) => (
                      <Draggable key={task.id} draggableId={task.id} index={idx}>
                        {(draggableProvided, snapshot) => (
                          <div
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                            className="ngo-task-card"
                            style={{
                              ...draggableProvided.draggableProps.style,
                              boxShadow: snapshot.isDragging ? '0 18px 40px rgba(2,6,23,0.12)' : undefined,
                            }}
                          >
                            <div className="ngo-task-card-head">
                              <h4 className="ngo-task-title">{task.title}</h4>
                              <div style={{display:'flex',gap:8,alignItems:'center'}}>
                                {task.assigned && task.assigned.length>0 && (
                                  <span className="ai-badge">🧠 AI Assigned</span>
                                )}
                                {task.state === 'Recommended' && (
                                  <span className="ai-badge small">⚡ Recommended</span>
                                )}
                                <span className={`priority-badge priority--${(task.priority||'low').toLowerCase()}`}>{task.priority||'Low'}</span>
                              </div>
                            </div>

                            <div className="ngo-task-meta">
                              <span className="meta-item"><IconLocation />{task.location}</span>
                              <span className="meta-item"><IconUsers />{task.volunteers}</span>
                              <span className="meta-item"><IconCalendar />{task.deadline}</span>
                            </div>

                            {task.assigned && task.assigned.length > 0 && (
                              <div className="ngo-task-assigned" style={{ marginTop: 8, display: 'flex', gap: 8, alignItems: 'center' }}>
                                {task.assigned.map((v) => (
                                  <div key={v.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <img
                                      src={v.avatar}
                                      alt={v.name}
                                      title={`${v.name}\nSkills: ${v.skills ? v.skills.join(', ') : '—'}\nAvailability: ${v.availability || '—'}`}
                                      aria-label={`${v.name}. Skills: ${v.skills ? v.skills.join(', ') : '—'}. Availability: ${v.availability || '—'}`}
                                      style={{ width: 28, height: 28, borderRadius: 999, objectFit: 'cover', border: '1px solid #eef2f6' }}
                                    />
                                    <span style={{ fontSize: 12, color: '#334155' }}>{v.name}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            <div className="ngo-task-progress">
                              <div className="progress-small">
                                <div className="progress-small__fill" style={{ width: `${task.progress}%`, background: task.progress === 100 ? '#10b981' : undefined }} />
                              </div>
                              <div className="progress-percent">{task.progress}%</div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {cols[colName].length === 0 && (
                      <div className="column-empty">
                        {colName === 'Assigned' ? (
                          <div className="empty-state">
                            <div className="empty-illustration">🧠</div>
                            <div className="empty-text">
                              <strong>No assigned tasks yet</strong>
                              <div className="muted">AI-assigned tasks will appear here</div>
                            </div>
                          </div>
                        ) : colName === 'Recommended' ? (
                          <div className="empty-state">
                            <div className="empty-illustration">⚡</div>
                            <div className="empty-text">
                              <strong>No recommendations yet</strong>
                              <div className="muted">AI recommendations will appear here</div>
                            </div>
                          </div>
                        ) : (
                          <div className="empty-state">
                            <div className="empty-illustration">—</div>
                            <div className="empty-text">
                              <strong>No tasks</strong>
                              <div className="muted">Nothing in this column</div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {provided.placeholder}
                  </div>
                </article>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </section>
  );
};

export default TaskProgressBoard;
