import Vue from 'vue'
import Vuex from 'vuex'
import  * as Mutation  from './todos-mutation-types'
import firebase from '~/plugins/firebase'

Vue.use(Vuex)

export const state = () => ({
    todos: []
})

export const getters = {
    allTodos (state) {
        return state.todos
    },
    activeTodos (state) {
        return state.todos.filter(todo => !todo.completed)
    },
    completedTodos (state) {
        return state.todos.filter(todo => todo.completed)
    }
}

export const mutations = {
    [Mutation.SET_TODOS] (state, todos) {
        state.todos = todos
    },
    [Mutation.ADD_TODO] (state, todo) {
        state.todos.push(todo)
    },
    [Mutation.REMOVE_TODO] (state, todo) {
        const i = state.todos.indexOf(todo)
        state.todos.splice(i, 1)
    },
    [Mutation.FILTER_TODOS] (state, value) {
        state.todos.forEach((todo) => {
            todo.completed = !value
        })
    }
}

export const actions = {
    addTodo ({ commit }, todo) {
        commit(Mutation.ADD_TODO, todo)
    },
    setTodos ({ commit }, todos) {
        commit(Mutation.SET_TODOS, todos)
    },
    removeTodo ({ commit }, todo) {
        commit(Mutation.REMOVE_TODO, todo)
    },
    allDone ({ state, commit }) {
        const values = state.todos.filter(todo => todo.completed).length === state.todos.length
        commit(Mutation.FILTER_TODOS, values)
    },
    saveTodos ({ state }) {
        //axios.put('/api/todos', { todos: state.todos })
        firebase.database().ref('todos').push(todo)
    },
    nuxtServerInit ({ commit }, { req }) {
        commit(Mutation.SET_TODOS, req.session ? (req.session.todos || []) : [])
    }
}