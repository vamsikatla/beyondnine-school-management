import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '7d';

export class AuthUtils {
  static generateToken(payload: any): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }

  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  // Simple password hashing for demo purposes (not secure for production)
  static async hashPassword(password: string): Promise<string> {
    // For demo purposes, we'll just return a simple hash-like string
    // In production, use bcrypt or similar
    return btoa(password + '-hashed');
  }

  // Simple password comparison for demo purposes
  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    // For demo purposes, we'll just compare with our simple hash
    return btoa(password + '-hashed') === hashedPassword;
  }

  static extractTokenFromHeader(authHeader: string | undefined): string | null {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.substring(7);
  }

  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export class RBACUtils {
  private static roleHierarchy = {
    SUPER_ADMIN: 100,
    SCHOOL_ADMIN: 80,
    TEACHER: 60,
    ACCOUNTANT: 50,
    STUDENT: 10,
    PARENT: 20
  };

  static hasMinimumRole(userRole: string, requiredRole: string): boolean {
    const userLevel = this.roleHierarchy[userRole as keyof typeof this.roleHierarchy] || 0;
    const requiredLevel = this.roleHierarchy[requiredRole as keyof typeof this.roleHierarchy] || 0;
    return userLevel >= requiredLevel;
  }
}