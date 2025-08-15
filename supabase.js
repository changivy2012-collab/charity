// Supabase JavaScript 客户端初始化
// 通过全局的supabase对象创建客户端

/**
 * 配置说明：
 * 1. 请将这些值替换为您自己的 Supabase 项目凭证
 * 2. 您可以在 Supabase 项目控制台的 "Project Settings" > "API" 中找到这些值
 * 3. 请确保您的 Supabase 数据库中有一个名为 'projects' 的表，包含以下字段：
 *    - id (integer)
 *    - name (text)
 *    - interests (text)
 *    - cause (text)
 *    - targetAudience (text)
 *    - description (text)
 *    - createdAt (timestamp)
 *    - donations (integer)
 */

// 请将这些值替换为您自己的 Supabase 项目凭证
const supabaseUrl = 'https://tmjdrcjioodfwoftvyzx.supabase.co'; // 例如: 'https://your-project.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtamRyY2ppb29kZndvZnR2eXp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxMzc0OTQsImV4cCI6MjA3MDcxMzQ5NH0.ybt1oy8O5n8nNCfGcRQ6h7ushiKxKLC4RjlMPusJdmY'; // 例如: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'

// 确保supabase全局对象已加载
let supabase;
document.addEventListener('DOMContentLoaded', function() {
  if (typeof window.supabase !== 'undefined') {
    // 创建 Supabase 客户端
    supabase = window.supabase.createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        detectSessionInUrl: false
      },
      db: {
        schema: 'public'
      }
    });
    // 将客户端附加到window对象，以便在其他文件中访问
    window.supabaseClient = supabase;
  } else {
    console.error('Supabase library not loaded');
  }
});

/**
 * 将新项目保存到 Supabase 数据库
 * @param {Object} projectData - 项目数据对象
 * @returns {Promise<Object>} 保存结果
 */
async function saveProject(projectData) {
  // 等待supabase客户端初始化完成
  while (!supabase) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  try {
    // 假设您的数据库中有一个名为 'projects' 的表
    // 请确保表结构与 projectData 对象的属性匹配
    // 明确指定要插入的字段，包括projectplan
    const { data, error } = await supabase
      .from('projects')
      .insert([{
        id: projectData.id,
        name: projectData.name,
        interests: projectData.interests,
        cause: projectData.cause,
        targetAudience: projectData.targetAudience,
        description: projectData.description,
        projectplan: projectData.projectplan,
        createdAt: projectData.createdAt,
        donations: projectData.donations || 0
      }])
      .select();

    if (error) {
      throw error;
    }

    console.log('项目保存成功:', data);
    return { success: true, data };
  } catch (error) {
    console.error('保存项目时出错:', error);
    // 特别处理行级安全策略错误
    if (error.code === '42501') {
      console.log('由于行级安全策略，无法保存到Supabase数据库。这在演示环境中是正常的。');
      return { success: false, error: error.message, code: error.code };
    }
    return { success: false, error: error.message };
  }
}

/**
 * 从 Supabase 数据库加载项目
 * @returns {Promise<Array>} 项目数组
 */
async function loadProjectsFromSupabase() {
  // 等待supabase客户端初始化完成
  while (!supabase) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  try {
    // 从 'projects' 表中选择所有项目，明确指定要获取projectplan字段
    const { data, error } = await supabase
      .from('projects')
      .select('id, name, interests, cause, targetAudience, description, projectplan, createdAt, donations');

    if (error) {
      throw error;
    }

    console.log('从Supabase加载项目:', data);
    return data || [];
  } catch (error) {
    console.error('从Supabase加载项目时出错:', error);
    return [];
  }
}

// 导出函数供其他文件使用
export { supabase, saveProject, loadProjectsFromSupabase };