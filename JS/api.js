
/* =========================================================
   API — Firestore Database Operations
   Role-based data access. Each user only sees their own data.
   ========================================================= */

const API = {
  // Users
  async createUserProfile(uid, data) {
    await db.collection('users').doc(uid).set({
      ...data,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  },

  async getUserProfile(uid) {
    const doc = await db.collection('users').doc(uid).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  },

  async updateUserProfile(uid, data) {
    await db.collection('users').doc(uid).update(data);
  },

  // Admin only
  async getAllUsers() {
    const snap = await db.collection('users').orderBy('createdAt', 'desc').get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },

  // Courses
  async createCourse(data) {
    const user = auth.currentUser;
    if (!user) throw new Error('Not authenticated');
    const ref = await db.collection('courses').add({
      ...data,
      instructorId: user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    return ref.id;
  },

  async getCourses(role, uid) {
    let q;
    if (role === 'admin') {
      q = db.collection('courses').orderBy('createdAt', 'desc');
    } else if (role === 'instructor') {
      q = db.collection('courses').where('instructorId', '==', uid);
    } else {
      // Student: get enrolled courses via enrollment subcollection
      const enrollSnap = await db.collection('enrollments').where('studentId', '==', uid).get();
      const courseIds = enrollSnap.docs.map(d => d.data().courseId);
      if (courseIds.length === 0) return [];
      // Firestore 'in' supports up to 10
      q = db.collection('courses').where(firebase.firestore.FieldPath.documentId(), 'in', courseIds.slice(0, 10));
    }
    const snap = await q.get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },

  async getCourseById(id) {
    const doc = await db.collection('courses').doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  },

  // Enrollments
  async enrollStudent(courseId, studentId) {
    const ref = db.collection('enrollments').doc(`${studentId}_${courseId}`);
    await ref.set({
      courseId,
      studentId,
      progress: 0,
      status: 'active',
      enrolledAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  },

  async getEnrollments(role, uid) {
    let q;
    if (role === 'admin') {
      q = db.collection('enrollments').orderBy('enrolledAt', 'desc');
    } else if (role === 'instructor') {
      // Get instructor's courses first, then enrollments for those courses
      const courseSnap = await db.collection('courses').where('instructorId', '==', uid).get();
      const courseIds = courseSnap.docs.map(d => d.id);
      if (courseIds.length === 0) return [];
      q = db.collection('enrollments').where('courseId', 'in', courseIds.slice(0, 10));
    } else {
      q = db.collection('enrollments').where('studentId', '==', uid);
    }
    const snap = await q.get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },

  async updateEnrollmentProgress(enrollmentId, progress) {
    await db.collection('enrollments').doc(enrollmentId).update({ progress });
  },

  // Stats / Dashboard data
  async getDashboardStats(role, uid) {
    if (role === 'admin') {
      const [usersSnap, coursesSnap, enrollmentsSnap] = await Promise.all([
        db.collection('users').get(),
        db.collection('courses').get(),
        db.collection('enrollments').get()
      ]);
      return {
        totalUsers: usersSnap.size,
        totalCourses: coursesSnap.size,
        totalEnrollments: enrollmentsSnap.size,
        revenue: '$48.2K' // Mock
      };
    } else if (role === 'instructor') {
      const courseSnap = await db.collection('courses').where('instructorId', '==', uid).get();
      const courseIds = courseSnap.docs.map(d => d.id);
      let totalStudents = 0;
      if (courseIds.length > 0) {
        const enrollSnap = await db.collection('enrollments')
          .where('courseId', 'in', courseIds.slice(0, 10)).get();
        totalStudents = enrollSnap.size;
      }
      return {
        myCourses: courseSnap.size,
        totalStudents,
        avgRating: '4.8',
        revenue: '$12.4K'
      };
    } else {
      const enrollSnap = await db.collection('enrollments').where('studentId', '==', uid).get();
      return {
        enrolledCourses: enrollSnap.size,
        learningHours: 127, // Could be stored per user
        completed: 2,
        avgGrade: 'A-'
      };
    }
  },

  // Seed demo data (run once from console or admin page)
  async seedDemoData() {
    const batch = db.batch();
    const courses = [
      { title: 'Advanced React Patterns', category: 'Web Development', instructorId: 'demo', rating: 4.9, students: 1245 },
      { title: 'Python for Data Science', category: 'Data Science', instructorId: 'demo', rating: 4.8, students: 982 },
      { title: 'Cybersecurity Fundamentals', category: 'Security', instructorId: 'demo', rating: 4.7, students: 756 },
      { title: 'AWS Cloud Architecture', category: 'Cloud Computing', instructorId: 'demo', rating: 4.9, students: 634 }
    ];
    courses.forEach((c, i) => {
      const ref = db.collection('courses').doc(`demo_course_${i}`);
      batch.set(ref, { ...c, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    });
    await batch.commit();
    console.log('Demo data seeded');
  }
};
