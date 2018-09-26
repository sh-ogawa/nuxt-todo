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
    load ({ commit }) {

        const db = firebase.firestore()
        db.settings({ timestampsInSnapshots: true})

        db.collection('todos').get()
            .then(querySnapshot => {
                querySnapshot.forEach(function(doc) {
                    const data = doc.data();
                    commit(Mutation.ADD_TODO, data.todo)
                })
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
    },
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
    // handlerイベントから直接dispatchしてくる
    saveTodos ({ state }) {
        const firestore = firebase.firestore()
        firestore.settings({ timestampsInSnapshots: true})
        const batch = firestore.batch()
        const ref = firestore.collection('todos').doc()
        for(const todo of state.todos) {
            batch.set(ref, {todo : todo})
        }
        batch.commit().then(function () {
            console.info('add todo')
        }).catch(function(error){
            console.error("Error adding document: ", error);
        })
    },
    nuxtServerInit ({ commit }, { req }) {
        commit(Mutation.SET_TODOS, req.session ? (req.session.todos || []) : [])
    }
}